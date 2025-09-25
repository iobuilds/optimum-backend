import { Express } from "express";

export interface design_upload_data {
  files: Express.Multer.File[];
  authUserId: number;
}
