import fs from "fs";
import path from "path";
import logger from "../config/logger";
import DefaultResponse from "../utils/DefaultResponse";
import designModel from "../models/design.model";
import { design_upload_data } from "../config/types/design";

const ensureDesignFolder = () => {
  const folder = path.join(process.cwd(), "uploads", "designs");
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
  return folder;
};

const design_upload = async (data: design_upload_data) => {
  try {
    const folder = ensureDesignFolder();
    const savedFiles: any[] = [];

    for (const file of data.files) {
      const destPath = path.join(folder, file.originalname);

      if (file.path) {
        fs.renameSync(file.path, destPath);
      } else if (file.buffer) {
        fs.writeFileSync(destPath, file.buffer as unknown as Uint8Array);
      }

      const dbPath = `/uploads/designs/${file.originalname}`;

      const dbResult = await designModel.design_add(dbPath, data.authUserId);

      savedFiles.push({
        id: dbResult.data?.insertId || null,
        filename: file.originalname,
        url: dbPath,
      });
    }

    return DefaultResponse.successFormat("200", {
      message: "Designs uploaded successfully",
      files: savedFiles,
    });
  } catch (err) {
    logger.error("Design upload error", err);
    return DefaultResponse.errorFormat("500", "Design upload failed");
  }
};

const design_list = async () => {
  try {
    const result = await designModel.design_list();
    return DefaultResponse.successFormat("200", { files: result.data || [] });
  } catch (err) {
    logger.error(err);
    return DefaultResponse.errorFormat("500", "Failed to fetch designs");
  }
};

const design_delete = async (id: number, authUserId: number) => {
  try {
    // 1. Get the design record
    const result: any = await designModel.design_list();
    const design = result.data?.find((d: any) => d.id === id);

    if (!design) return DefaultResponse.errorFormat("404", "Design not found");

    // 2. Delete the physical file
    const filePath = path.join(process.cwd(), design.url);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    // 3. Delete from DB (mark as deleted)
    const deleteResult = await designModel.design_delete(id);

    return deleteResult;
  } catch (err) {
    logger.error(err);
    return DefaultResponse.errorFormat("500", "Failed to delete design");
  }
};


export default {
  design_upload,
  design_list,
  design_delete,
};
