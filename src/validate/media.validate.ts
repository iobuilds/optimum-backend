import joi from "joi";

const media_upload = joi.object({
  project_id: joi.number()
    .min(1)
    .max(2147483647)
    .required()
    .label("project_id"),
});

const media_list = joi.object({
  project_id: joi.number()
    .min(1)
    .max(2147483647)
    .required()
    .label("project_id"),
});

const media_delete = joi.object({
  id: joi.number()
    .min(1)
    .max(2147483647)
    .required()
    .label("id"),
});

const feature_image_upload = joi.object({
  project_id: joi.number()
    .min(1)
    .max(2147483647)
    .required()
    .label("project_id"),
});

const feature_image_view = joi.object({
  project_id: joi.number()
    .min(1)
    .max(2147483647)
    .required()
    .label("project_id"),
});

export default {
  media_upload,
  media_list,
  media_delete,
  feature_image_upload,
  feature_image_view
};
