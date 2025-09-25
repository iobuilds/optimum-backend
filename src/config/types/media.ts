// Upload new media
export interface media_upload_data {
  project_id: number;
  files: Express.Multer.File[];
  authUserId: number;
  authUserRole: number;
}

// List media by project
export interface media_list_data {
  project_id: number;
}

// Delete media
export interface media_delete_data {
  id: number; // media_id
  authUserId: number;
  authUserRole: number;
}

// Upload feature image
export interface feature_image_upload_data {
  project_id: number;
  file: Express.Multer.File; // single file
  authUserId: number;
  authUserRole: number;
}

// View feature image
export interface feature_image_view_data {
  project_id: number;
  authUserId: number;
  authUserRole: number;
}