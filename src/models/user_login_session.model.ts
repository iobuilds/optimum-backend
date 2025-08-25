import db from "../config/db";
import logger from '../config/logger';
import config from './../config/config';
import DefaultResponse from "../utils/DefaultResponse";
import { DateTime } from 'luxon';
import bcrypt from "bcrypt";
    
const user_login_session_add = async ( userId: number, token: string, ipAddress: string, osName: string ) => {

    try {

        const currentDateTime = DateTime.now().setZone("Asia/Colombo").toFormat("y-MM-dd HH:mm:ss");
        token = await bcrypt.hash( token.split('').reverse().join(''), config.pass_salt ); // Hash the token
    
        let result = await db.query('INSERT INTO `user_login_session`(user_id, token, login_time, ip_address, os_name) VALUES (?, ?, ?, ?, ?)', [userId, token, currentDateTime, ipAddress, osName]);

        if (result.status) {
            return DefaultResponse.successFormat("200", {
                insertId: result.data.insertId
            });
        }
        return result;

    } catch ( err ) {
        logger.error( err );
        return DefaultResponse.errorFormat("500");
    }
    
};

const user_login_session_remove = async ( id: number, authUserId: number ) => {

    try {

        const currentDateTime = DateTime.now().setZone("Asia/Colombo").toFormat("y-MM-dd HH:mm:ss");
    
        let result = await db.query('UPDATE `user_login_session` SET status = ? WHERE id = ? && user_id = ? ', [2, id, authUserId]);

        if (result.status) {
            return DefaultResponse.successFormat("200");
        }
        return result;

    } catch ( err ) {
        logger.error( err );
        return DefaultResponse.errorFormat("500");
    }
    
};

export default {
    user_login_session_add,
    user_login_session_remove
}