import { Express } from "express";

export interface plan_upload_data {
  files: Express.Multer.File[];
  authUserId: number;
}
