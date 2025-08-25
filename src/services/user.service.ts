import userModel from "../models/user.model";
import userLoginSessionModel from "../models/user_login_session.model";
import DefaultResponse from "../utils/DefaultResponse";
import logger from '../config/logger';
import {user_login_data, user_add_data, user_edit_data, user_list_data, user_view_data, user_forget_password_data, user_reset_password_data} from "../config/types/user";
import emailFunction from "../utils/email";
import emailTemplates from "../utils/emailTemplates";
import config from './../config/config';

const user_login = async ( data: user_login_data ) => {

    try {

        let result;
        result = await userModel.user_login( data.email ,data.password );
        if(!result.status) {
            return result;
        }
        // User login session add
        let session = await userLoginSessionModel.user_login_session_add(result.data.userId, result.data.accessToken, data.ipAddress, data.osName);
        if(!session.status) {
            return session;
        }
        return result;

    } catch (err) {
        logger.error(err);
        return DefaultResponse.errorFormat("500");
    }
};

const user_add = async ( data: user_add_data ) => {

    try {

        let result;
        result = await userModel.user_add( data.firstName, data.lastName, data.email, data.phoneNumber, data.password, data.role, data.authUserId );
        return result;

    } catch (err) {
        logger.error(err);
        return DefaultResponse.errorFormat("500");
    }
};

const user_edit = async ( data: user_edit_data ) => {

    try {

        let result;
        result = await userModel.user_edit( data.firstName, data.lastName, data.email, data.phoneNumber, data.password, data.role, data.authUserId, data.id );
        return result;

    } catch (err) {
        logger.error(err);
        return DefaultResponse.errorFormat("500");
    }
};

const user_list = async ( data: user_list_data ) => {

    try {

        let result;
        result = await userModel.user_list(  );
        return result;

    } catch (err) {
        logger.error(err);
        return DefaultResponse.errorFormat("500");
    }
};

const user_view = async ( data: user_view_data ) => {

    try {

        let result;
        result = await userModel.user_view( data.id );
        return result;

    } catch (err) {
        logger.error(err);
        return DefaultResponse.errorFormat("500");
    }
};

const user_forget_password = async ( data: user_forget_password_data ) => {

    try {

        let result;
        // Get user information
        result = await userModel.user_view_by_email(data.email);
        if(!result.status) {
            return result;
        }
        let userId = result.data.id;
        let firstName = result.data.first_name;
        let lastName = result.data.last_name;
        // Temp key generate
        let tempKey = Math.floor(100000 + Math.random() * 900000).toString();
        // Update temp key
        result = await userModel.user_forget_password( tempKey, data.email );
        if(!result.status) return result;
        //  Send Email
        const link = `${config.domain}/change-password/${userId}/${tempKey}`;
        let message = emailTemplates.change_password_email(`${firstName} ${lastName}` , link);
        let response = await emailFunction.emailSend(data.email, "Set your new password", message);
        if(!response){
            return DefaultResponse.errorFormat("202");
        }
        // Return response
        return result;

    } catch (err) {
        logger.error(err);
        return DefaultResponse.errorFormat("500");
    }
};

const user_reset_password = async ( data: user_reset_password_data ) => {

    try {

        let result;
        result =  await userModel.user_reset_password_validation( data.id, data.tempKey );
        if(!result.status) {
            return result;
        }
        let userRole = result.data.role;
        result = await userModel.user_reset_password( data.password, data.id, data.tempKey, userRole );
        return result;

    } catch (err) {
        logger.error(err);
        return DefaultResponse.errorFormat("500");
    }
};

export default {
    user_login,
    user_add,
    user_edit,
    user_list,
    user_view,
    user_forget_password,
    user_reset_password
}