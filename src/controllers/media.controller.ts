import { Response } from "express";
import { ExtendedRequest } from "../config/types";
import logger from '../config/logger';
import DefaultResponse from "../utils/DefaultResponse";
import authorize from "../utils/authorize";
import catchAsync from "../utils/catchAsync";
import services from "../services/media.service";
import validate from "../validate/media.validate";
import validateInput from "../utils/validate";
import { media_upload_data, media_list_data, media_delete_data, feature_image_upload_data } from "../config/types/media";

// Upload media
const media_upload = catchAsync(async (req: ExtendedRequest, res: Response) => {
  try {
    // 1. Validate only req.body
    const validatedBody = await validate.media_upload.validateAsync(req.body);

    // 2. Authorization
    const authData = authorize("project_media", "media_upload", req);
    if (!authData.status) return DefaultResponse.error(res, "403");

    // 3. Build payload including files
    const payload: media_upload_data = {
      project_id: Number(validatedBody.project_id), // <- validated body
      files: req.files as Express.Multer.File[],   // <- multer files
      authUserId: authData.data.user,
      authUserRole: authData.data.role,
    };

    // 4. Call service
    const result = await services.media_upload(payload);

    return res.status(200).send(result);
  } catch (err) {
    console.error("Upload error:", err);
    return DefaultResponse.error(res, "500");
  }
});


// List media
const media_list = catchAsync(async (req: ExtendedRequest, res: Response) => {
  try {
    // Validate input
    const data = await validate.media_list.validateAsync(req.body);
    // Joi returns { project_id: number } directly
    const projectId: number = Number(data.project_id);

    

    // Payload for service
    const payload: media_list_data = {
      project_id: projectId,
      
    };

    // Call service
    const result = await services.media_list(payload);

    // Send response
    return res.status(200).json(result);
  } catch (err) {
    console.error("List error:", err);
    return DefaultResponse.error(res, "500");
  }
});


// Delete media
const media_delete = catchAsync(async (req: ExtendedRequest, res: Response) => {
  try {
    // 1. Validate body with Joi
    const data = await validate.media_delete.validateAsync(req.body);

    // Joi returns plain object { id: number }
    const mediaId: number = Number(data.id);

    // 2. Authorization
    const authData = authorize("project_media", "media_delete", req);
    if (!authData.status) {
      return DefaultResponse.error(res, "403");
    }

    // 3. Build payload for service
    const payload: media_delete_data = {
      id: mediaId,
      authUserId: authData.data.user,
      authUserRole: authData.data.role,
    };

    // 4. Call service
    const result = await services.media_delete(payload);

    // 5. Return full DefaultResponse
    return res.status(200).json(result);
  } catch (err) {
    console.error("Delete error:", err);
    return DefaultResponse.error(res, "500");
  }
});

// Upload feature image
const feature_image_upload = catchAsync(async (req: ExtendedRequest, res: Response) => {
  try {
    // 1. Validate body (only project_id required)
    const validatedBody = await validate.feature_image_upload.validateAsync(req.body);

    // 2. Authorization
    const authData = authorize("project_media", "feature_image_upload", req);
    if (!authData.status) return DefaultResponse.error(res, "403");

    // 3. Ensure file exists
    if (!req.file) {
      return DefaultResponse.error(res, "400", "No feature image file uploaded");
    }

    // 4. Build payload
    const payload: feature_image_upload_data = {
      project_id: Number(validatedBody.project_id),
      file: req.file as Express.Multer.File,
      authUserId: authData.data.user,
      authUserRole: authData.data.role,
    };

    // 5. Call service
    const result = await services.feature_image_upload(payload);

    return res.status(200).send(result);
  } catch (err) {
    console.error("Feature image upload error:", err);
    return DefaultResponse.error(res, "500");
  }
});

const feature_image_getById = catchAsync(async (req: ExtendedRequest, res: Response) => {

    try{

        /**
         * @detail
         * Input Validation
         */
        const data = await validateInput(req.body, validate.feature_image_view);
        if (!data.status) {
            res.status(200).send( data );
            return;
        }
        
        /**
         * @detail
         * Authorization
         */
        let authData = authorize('project_media', 'view_feature_image', req);
        if (!authData.status) {
            DefaultResponse.error(res, '403');
            return;
        }
        data.data.authUserId = authData.data.user;
        data.data.authUserRole = authData.data.role;
        
        /**
         * @detail
         * Service function call
         */
        const result = await services.feature_image_view( data.data );
        res.status(200).send( result );

    } catch (err){
        logger.error(err);
        DefaultResponse.error(res, "500");
    }
       
});
export default {
  media_upload,
  media_list,
  media_delete,
  feature_image_upload,
  feature_image_getById
};
