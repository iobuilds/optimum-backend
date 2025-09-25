import db from "../config/db";
import logger from "../config/logger";
import DefaultResponse from "../utils/DefaultResponse";
import { DateTime } from "luxon";

const media_add = async (
  project_id: number,
  type: "image" | "video",
  url: string,
  authUserId: number
) => {
  try {
    const exists = await db.query(
      `SELECT id FROM project_media WHERE project_id = ? AND type = ? AND url = ?`,
      [project_id, type, url]
    );

    if (exists.status && exists.data.length > 0) {
      return DefaultResponse.successFormat("200", {
        message: "Media already exists",
        id: exists.data[0].id,
      });
    }
    const currentDateTime = DateTime.now()
      .setZone("Asia/Colombo")
      .toFormat("y-MM-dd HH:mm:ss");

    const result = await db.query(
      `INSERT INTO project_media (project_id, type, url, added_by, added_time) 
       VALUES (?, ?, ?, ?, ?)`,
      [project_id, type, url, authUserId, currentDateTime]
    );

    if (result.status) {
      return DefaultResponse.successFormat("200", {
        insertId: result.data.insertId,
      });
    }
    return DefaultResponse.errorFormat("500", "Failed to insert media");
  } catch (err) {
    logger.error("media_add error", err);
    return DefaultResponse.errorFormat("500", "Internal server error");
  }
};

// List all media for a project
const media_list = async (project_id: number) => {
  try {
    const result = await db.query(
      `SELECT id, project_id, type, url, added_by,
        DATE_FORMAT(added_time, '%Y-%m-%d %H:%i:%s') AS added_time
       FROM project_media
       WHERE project_id = ? ORDER BY id DESC`,
      [project_id]
    );

    // Ensure the response has status and data
    return { status: true, data: result.data || [] };
  } catch (err) {
    logger.error(err);
    return { status: false, data: [], message: "DB error" };
  }
};


const media_getById = async (id: number) => {
  try {
    const result = await db.query(
      `SELECT id, project_id, type, url, added_by,
        DATE_FORMAT(added_time, '%Y-%m-%d %H:%i:%s') AS added_time
       FROM project_media
       WHERE id = ? LIMIT 1`,
      [id]
    );

    if (result.status && result.data.length > 0) {
      return result.data[0]; // plain object
    }
    return null;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

const feature_image_getById = async (id: number) => {
  try {
    const result = await db.query(
      `SELECT f_image_url AS url
       FROM project
       WHERE id = ?`,
      [id]
    );

    if (result.status && result.data.length > 0) {
      return { status: true, data: result.data }; // array of rows
    }

    return { status: false, data: [], message: "Not found" };
  } catch (err) {
    logger.error("feature_image_getById error", err);
    return { status: false, data: [], message: "DB error" };
  }
};


const media_deleteById = async (id: number) => {
  try {
    const result = await db.query(`DELETE FROM project_media WHERE id = ?`, [id]);
    return result.status;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

const updateProjectFeatureImage = async (project_id: number, url: string) => {
  try {
    const result = await db.query(
      `UPDATE project SET f_image_url = ? WHERE id = ?`,
      [url, project_id]
    );

    if (result.status) {
      return DefaultResponse.successFormat("200", { url });
    } else {
      return DefaultResponse.errorFormat("500", "Failed to update feature image URL");
    }
  } catch (err) {
    logger.error("updateProjectFeatureImage error", err);
    return DefaultResponse.errorFormat("500", "Internal server error");
  }
};
export default {
  media_add,
  media_list,
  media_getById,
  media_deleteById,
  updateProjectFeatureImage,
  feature_image_getById
};
