import bcrypt from "bcrypt";
import config from './../config/config';
import jwt from 'jsonwebtoken';
import db from "../config/db";
import logger from '../config/logger';
import DefaultResponse from "../utils/DefaultResponse";
import { DateTime } from 'luxon';

const user_login = async ( email:string, password:string ) => {

    let hashPassword= await bcrypt.hash( password, config.pass_salt );
    console.log("🚀 ~ constuser_login= ~ hashPassword:", hashPassword)
    
    let result  = await db.query('SELECT user.id, user.role FROM user WHERE user.email = ? && user.password = ? && user.status = 1', [email,hashPassword ]);
    console.log(result);
    // If error in sql query
    if ( !result.status ) {
        return result;
    }

    // If wrong password
    if ( result.data.length === 0 ) {
        return DefaultResponse.errorFormat('001')
    }

    const accessToken = jwt.sign(
        { user: result.data[0].id, role: result.data[0].role },
        config.jwt_access_key,
        {
            expiresIn: parseInt(config.jwt_a_max_age),
        }
    );

    return DefaultResponse.successFormat("200", {
        accessToken: accessToken,
        role: result.data[0].role,
        userId: result.data[0].id
    });

};

const user_add = async ( firstName: string, lastName: string, email: string, phoneNumber: number, password: string, role: number, authUserId: number ) => {

    try {

        let hashPassword= await bcrypt.hash( password, config.pass_salt );
        const currentDateTime = DateTime.now().setZone("Asia/Colombo").toFormat("y-MM-dd HH:mm:ss");
    
        let result = await db.query('INSERT INTO `user`(first_name, last_name, email, phone_number, password, role, status, added_by, added_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [firstName, lastName, email, phoneNumber, hashPassword, role, 1, authUserId, currentDateTime]);

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

const user_edit = async ( firstName: string, lastName: string, email: string, phoneNumber: number, password: string, role: number, authUserId: number, id: number ) => {

    try {

        const currentDateTime = DateTime.now().setZone("Asia/Colombo").toFormat("y-MM-dd HH:mm:ss");
    
        let result = await db.query('UPDATE `user` SET first_name = ?, last_name = ?, email = ?, phone_number = ?,  role = ?, updated_by = ?, updated_time = ? WHERE id = ? ', [firstName, lastName, email, phoneNumber,  role, authUserId, currentDateTime, id]);

        if (result.status) {
            return DefaultResponse.successFormat("200");
        }
        return result;

    } catch ( err ) {
        logger.error( err );
        return DefaultResponse.errorFormat("500");
    }
    
};

const user_list = async (  ) => {

    try {

        let result = await db.query(`SELECT user.id, user.first_name, user.last_name, user.email, user.phone_number,  user.role, user.status, user.added_by, DATE_FORMAT(user.added_time, '%Y-%m-%d %H:%i:%s') AS added_time, user.updated_by, DATE_FORMAT(user.updated_time, '%Y-%m-%d %H:%i:%s') AS updated_time
        FROM user
        INNER JOIN user_role ON user_role.id = user.role ORDER BY user.id DESC`, [ ]);
        return result;

    } catch ( err ) {
        logger.error( err );
        return DefaultResponse.errorFormat("500");
    }
    
};

const user_view = async ( id: number ) => {

    try {

        let result = await db.query(`SELECT user.id, user.first_name, user.last_name, user.email, user.phone_number,  user.role, user.status, user.added_by, DATE_FORMAT(user.added_time, '%Y-%m-%d %H:%i:%s') AS added_time, user.updated_by, DATE_FORMAT(user.updated_time, '%Y-%m-%d %H:%i:%s') AS updated_time
        FROM user
        INNER JOIN user_role ON user_role.id = user.role
        WHERE user.id = ? `, [ id]);
        if (!result.status) {
            return result;
        }
        if(result.data.length === 0) {
            return DefaultResponse.errorFormat("404");
        }
        return DefaultResponse.successFormat("200", result.data[0]);

    } catch ( err ) {
        logger.error( err );
        return DefaultResponse.errorFormat("500");
    }
    
};

const user_forget_password = async ( tempKey: string, email: string ) => {

    try {
    
        const currentDateTime = DateTime.now().setZone("Asia/colombo").toFormat("y-MM-dd HH:mm:ss");

        let result = await db.query(`UPDATE user SET temp_key = ?, temp_key_timestamp = ? WHERE email = ? && (temp_key_timestamp + INTERVAL 1 HOUR < '${currentDateTime}' || temp_key_timestamp is null)`, [tempKey, currentDateTime, email]);

        if (result.status) {
            if(result.data.changedRows === 0) {
                return DefaultResponse.errorFormat("000", "Password reset link already sended. check your email inbox.")
            } else {
                return DefaultResponse.successFormat("200");
            }
        }
        return result;

    } catch ( err ) {
        logger.error( err );
        return DefaultResponse.errorFormat("500");
    }
    
};

const user_view_by_email = async ( email: string ) => {

    try {

        let result = await db.query(`SELECT user.id, user.first_name, user.last_name
        FROM user
        WHERE user.email = ?`, [ email]);
        if (!result.status) {
            return result;
        }
        if(result.data.length === 0) {
            return DefaultResponse.errorFormat("404");
        }
        return DefaultResponse.successFormat("200", result.data[0]);

    } catch ( err ) {
        logger.error( err );
        return DefaultResponse.errorFormat("500");
    }
    
};

const user_reset_password_validation = async ( id: number, tempKey: string ) => {

    try {

        let result = await db.query(`SELECT user.id, user.role
        FROM user
        WHERE user.id = ? && user.temp_key = ? && temp_key != ?`, [ id, tempKey, "" ]);
        if (!result.status) {
            return result;
        }
        if(result.data.length === 0) {
            return DefaultResponse.errorFormat("000", "This link was expired");
        }
        return DefaultResponse.successFormat("200", result.data[0]);

    } catch ( err ) {
        logger.error( err );
        return DefaultResponse.errorFormat("500");
    }
    
};

const user_reset_password = async ( password: string, id: number, tempKey: string, role: number ) => {

    try {

        const currentDateTime = DateTime.now().setZone("Asia/colombo").toFormat("y-MM-dd HH:mm:ss");
        password = await bcrypt.hash( password, config.pass_salt ); // Hash the password
    
        let result = await db.query(`UPDATE user SET password = ?, temp_key = ?, updated_time = ? WHERE id = ? && temp_key = ? && temp_key != ?`, [password, "", currentDateTime, id, tempKey, ""]);

        if (!result.status) {
            return result;
        }
        const accessToken = jwt.sign(
            { user: id, role: role },
            config.jwt_access_key,
            {
                expiresIn: parseInt(config.jwt_a_max_age),
            }
        );
    
        return DefaultResponse.successFormat("200", {
            accessToken: accessToken,
            role: role,
            userId: id
        });

    } catch ( err ) {
        logger.error( err );
        return DefaultResponse.errorFormat("500");
    }
    
};

const user_login_session_add = async ( userId: number, token: string, ipAddress: string, osName: string ) => {

    try {
        console.log(userId,token,ipAddress,osName);
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
    user_login,
    user_add,
    user_edit,
    user_list,
    user_view,
    user_forget_password,
    user_view_by_email,
    user_reset_password_validation,
    user_reset_password,
    user_login_session_add,
    user_login_session_remove
}