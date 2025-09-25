import { Response } from "express";
import { ExtendedRequest } from "../config/types";
import catchAsync from "../utils/catchAsync";
import authorize from "../utils/authorize";
import DefaultResponse from "../utils/DefaultResponse";
import services from "../services/design.service";
import { design_upload_data } from "../config/types/design";

// Upload designs
const design_upload = catchAsync(async (req: ExtendedRequest, res: Response) => {
  try {
    // Authorization
    const authData = authorize("design", "design_add", req);
    if (!authData.status) return DefaultResponse.error(res, "403");

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return DefaultResponse.error(res, "400", "No files uploaded");
    }

    const payload: design_upload_data = {
      files: req.files as Express.Multer.File[],
      authUserId: authData.data.user,
    };

    const result = await services.design_upload(payload);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return DefaultResponse.error(res, "500");
  }
});

// List designs
const design_list = catchAsync(async (req: ExtendedRequest, res: Response) => {
  

  const result = await services.design_list();
  return res.status(200).json(result);
});

// Delete design
const design_delete = catchAsync(async (req: ExtendedRequest, res: Response) => {
  const { id } = req.body;

  // Authorization
  const authData = authorize("design", "design_delete", req);
  if (!authData.status) return DefaultResponse.error(res, "403");

  const result = await services.design_delete(Number(id), authData.data.user);
  return res.status(200).json(result);
});

export default {
  design_upload,
  design_list,
  design_delete,
};
