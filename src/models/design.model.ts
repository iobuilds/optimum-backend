import db from "../config/db";
import DefaultResponse from "../utils/DefaultResponse";
import logger from "../config/logger";
import { DateTime } from "luxon";

const design_add = async (url: string, authUserId: number) => {
  try {
    const added_time = DateTime.now().setZone("Asia/Colombo").toFormat("y-MM-dd HH:mm:ss");

    const result: any = await db.query(
      "INSERT INTO `design` (url, added_by, added_time) VALUES (?, ?, ?)",
      [url, authUserId, added_time]
    );

    if (result.status) {
      // insertId is inside result.data.insertId
      return DefaultResponse.successFormat("200", { insertId: result.data.insertId, url });
    }

    return result;
  } catch (err) {
    logger.error(err);
    return DefaultResponse.errorFormat("500");
  }
};

const design_list = async () => {
  try {
    const result: any = await db.query("SELECT * FROM `design` WHERE status != ?", ["deleted"]);
    return result;
  } catch (err) {
    logger.error(err);
    return DefaultResponse.errorFormat("500");
  }
};

const design_delete = async (id: number) => {
  try {
    const result: any = await db.query(
      "DELETE FROM `design` WHERE id = ?",
      [id]
    );

    if (result.status) return DefaultResponse.successFormat("200", { id });
    return result;
  } catch (err) {
    logger.error(err);
    return DefaultResponse.errorFormat("500");
  }
};

export default {
  design_add,
  design_list,
  design_delete,
};
