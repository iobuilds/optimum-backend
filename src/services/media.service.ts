import mediaModel from "../models/media.model";
import DefaultResponse from "../utils/DefaultResponse";
import logger from "../config/logger";
import path from "path";
import fs from "fs";
import {
  media_upload_data,
  media_list_data,
  media_delete_data,
} from "../config/types/media";

const ensureProjectFolders = (projectId: number) => {
  const base = path.join(process.cwd(), "uploads", `project_${projectId}`);
  const imagesFolder = path.join(base, "images");
  const videosFolder = path.join(base, "videos");

  [base, imagesFolder, videosFolder].forEach((folder) => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  });

  return { base, imagesFolder, videosFolder };
};

const media_upload = async (data: media_upload_data) => {
  try {
    const folders = ensureProjectFolders(data.project_id);
    const savedFiles: any[] = [];

    for (const file of data.files) {
      const type: "image" | "video" =
        file.mimetype.startsWith("image/") ? "image" : "video";

      const destFolder = type === "image" ? folders.imagesFolder : folders.videosFolder;
      const destPath = path.join(destFolder, file.originalname);

      // Save file to disk
      if (file.path) {
        fs.renameSync(file.path, destPath);
      } else if (file.buffer) {
        fs.writeFileSync(destPath, file.buffer as unknown as Uint8Array);
      }


      const dbPath = `/uploads/project_${data.project_id}/${type}s/${file.originalname}`;

      // Save to DB
      const dbResult = await mediaModel.media_add(
        data.project_id,
        type,
        dbPath,
        data.authUserId
      );

      // Push saved file info for API response
      savedFiles.push({
        id: dbResult.data?.insertId || null, // actual inserted ID
        filename: file.originalname,
        type,
        url: dbPath,
      });
    }

    return DefaultResponse.successFormat("200", {
      message: "Uploaded successfully",
      project_id: data.project_id,
      files: savedFiles,
    });
  } catch (err) {
    logger.error("Media upload error", err);
    return DefaultResponse.errorFormat("500", "Media upload failed");
  }
};


const media_list = async (data: media_list_data) => {
  try {
    const result = await mediaModel.media_list(data.project_id);

    if (!result.status) {
      return DefaultResponse.errorFormat("500", "Failed to fetch media list");
    }

    return DefaultResponse.successFormat("200", {
      project_id: data.project_id,
      files: result.data, // should be array of media objects
    });
  } catch (err) {
    logger.error("Media list error", err);
    return DefaultResponse.errorFormat("500", "Failed to fetch media list");
  }
};


const media_delete = async (data: media_delete_data) => {
  try {
    // Get media info from DB
    const media = await mediaModel.media_getById(data.id);
    if (!media) {
      return DefaultResponse.errorFormat("404", "Media not found");
    }

    // Build absolute path for root-level uploads folder
    const absolutePath = path.join(process.cwd(), media.url); // <-- use process.cwd()
    if (fs.existsSync(absolutePath)) fs.unlinkSync(absolutePath);

    // Delete from DB
    const deleted = await mediaModel.media_deleteById(data.id);
    if (!deleted) {
      return DefaultResponse.errorFormat("500", "Failed to delete media");
    }

    return DefaultResponse.successFormat("200", {
      message: "Deleted successfully",
      id: data.id,
    });
  } catch (err) {
    logger.error("Media delete error", err);
    return DefaultResponse.errorFormat("500", "Internal server error");
  }
};

export default {
  media_upload,
  media_list,
  media_delete,
};
