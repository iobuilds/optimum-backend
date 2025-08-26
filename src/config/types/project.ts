// Add new project
export interface project_add_data {
  name: string;
  description: string;
  status: string;
  authUserId: number;
  authUserRole: number;
}

// List projects
export interface project_list_data {
  authUserId: number;
  authUserRole: number;
}

// View single project
export interface project_view_data {
  id: number;
  authUserId: number;
  authUserRole: number;
}

// Change project status
export interface project_status_change_data {
  id: number;
  status: string;
  authUserId: number;
  authUserRole: number;
}

// Get only active (ongoing) projects
export interface project_active_list_data {
  authUserId: number;
  authUserRole: number;
}

// Edit project
export interface project_edit_data {
  id: number;
  name: string;
  description: string;
  status: string;
  authUserId: number;
  authUserRole: number;
}

// Delete project
export interface project_delete_data {
  id: number;
  status: string;
  authUserId: number;
  authUserRole: number;
}
