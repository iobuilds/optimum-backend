import { Response } from "express";
import { ExtendedRequest } from "../config/types";
import catchAsync from "../utils/catchAsync";
import authorize from "../utils/authorize";
import DefaultResponse from "../utils/DefaultResponse";
import services from "../services/plan.service";
import { plan_upload_data } from "../config/types/plan";

// Upload plans
const plan_upload = catchAsync(async (req: ExtendedRequest, res: Response) => {
  try {
    const authData = authorize("plan", "plan_add", req);
    if (!authData.status) return DefaultResponse.error(res, "403");

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return DefaultResponse.error(res, "400", "No files uploaded");
    }

    const payload: plan_upload_data = {
      files: req.files as Express.Multer.File[],
      authUserId: authData.data.user,
    };

    const result = await services.plan_upload(payload);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return DefaultResponse.error(res, "500");
  }
});

// List plans
const plan_list = catchAsync(async (req: ExtendedRequest, res: Response) => {
  

  const result = await services.plan_list();
  return res.status(200).json(result);
});

// Delete plan
const plan_delete = catchAsync(async (req: ExtendedRequest, res: Response) => {
  const { id } = req.body;

  const authData = authorize("plan", "plan_delete", req);
  if (!authData.status) return DefaultResponse.error(res, "403");

  const result = await services.plan_delete(Number(id), authData.data.user);
  return res.status(200).json(result);
});

export default {
  plan_upload,
  plan_list,
  plan_delete,
};
