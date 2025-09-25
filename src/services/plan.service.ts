import fs from "fs";
import path from "path";
import logger from "../config/logger";
import DefaultResponse from "../utils/DefaultResponse";
import planModel from "../models/plan.model";
import { plan_upload_data } from "../config/types/plan";

const ensurePlanFolder = () => {
  const folder = path.join(process.cwd(), "uploads", "plans");
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
  return folder;
};

const plan_upload = async (data: plan_upload_data) => {
  try {
    const folder = ensurePlanFolder();
    const savedFiles: any[] = [];

    for (const file of data.files) {
      const destPath = path.join(folder, file.originalname);

      if (file.path) {
        fs.renameSync(file.path, destPath);
      } else if (file.buffer) {
        fs.writeFileSync(destPath, file.buffer as unknown as Uint8Array);
      }

      const dbPath = `/uploads/plans/${file.originalname}`;
      const dbResult = await planModel.plan_add(dbPath, data.authUserId);

      savedFiles.push({
        id: dbResult.data?.insertId || null,
        filename: file.originalname,
        url: dbPath,
      });
    }

    return DefaultResponse.successFormat("200", {
      message: "Plans uploaded successfully",
      files: savedFiles,
    });
  } catch (err) {
    logger.error("Plan upload error", err);
    return DefaultResponse.errorFormat("500", "Plan upload failed");
  }
};

const plan_list = async () => {
  try {
    const result = await planModel.plan_list();
    return DefaultResponse.successFormat("200", { files: result.data || [] });
  } catch (err) {
    logger.error(err);
    return DefaultResponse.errorFormat("500", "Failed to fetch plans");
  }
};

const plan_delete = async (id: number, authUserId: number) => {
  try {
    // Get record
    const result: any = await planModel.plan_list();
    const plan = result.data?.find((p: any) => p.id === id);

    if (!plan) return DefaultResponse.errorFormat("404", "Plan not found");

    // Delete physical file
    const filePath = path.join(process.cwd(), plan.url);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    // Delete from DB
    const deleteResult = await planModel.plan_delete(id);
    return deleteResult;
  } catch (err) {
    logger.error(err);
    return DefaultResponse.errorFormat("500", "Failed to delete plan");
  }
};

export default {
  plan_upload,
  plan_list,
  plan_delete,
};
