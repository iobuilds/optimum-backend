export interface user_login_data {    
    email: string;    
    password: string;
    authUserId: number;
    authUserRole: number;
    ipAddress: string;
    osName: string;
}
    
export interface user_add_data {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    password: string;
    role: number;
    authUserId: number;
    authUserRole: number;

}
export interface user_edit_data {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    password: string;
    role: number;
    authUserId: number;
    authUserRole: number;

}
export interface user_list_data {
    authUserId: number;
    authUserRole: number;

}
export interface user_view_data {
    id: number;
    authUserId: number;
    authUserRole: number;

}
export interface user_forget_password_data {
    email: string;
    authUserId: number;
    authUserRole: number;

}
export interface user_reset_password_data {
    id: number;
    password: string;
    tempKey: string;
    authUserId: number;
    authUserRole: number;

}