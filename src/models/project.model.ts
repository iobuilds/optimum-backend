import db from "../config/db";
import logger from '../config/logger';
import DefaultResponse from "../utils/DefaultResponse";
import { DateTime } from 'luxon';

const project_add = async ( name: string, status: string, description: string, authUserId: number ) => {

    try {

        const currentDateTime = DateTime.now().setZone("Asia/Colombo").toFormat("y-MM-dd HH:mm:ss");
    
        let result = await db.query('INSERT INTO `project`(name, description, status, added_by, added_time) VALUES (?, ?, ?, ?, ?)', [name, description, status, authUserId, currentDateTime]);

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

const project_edit = async ( name: string, status: string, description: string, authUserId: number, id: number ) => {

    try {

        const currentDateTime = DateTime.now().setZone("Asia/Colombo").toFormat("y-MM-dd HH:mm:ss");
    
        let result = await db.query('UPDATE `project` SET name = ?, description = ?, status = ?, updated_by = ?, updated_time = ? WHERE id = ? ', [name, description, status, authUserId, currentDateTime, id]);

        if (result.status) {
            return DefaultResponse.successFormat("200");
        }
        return result;

    } catch ( err ) {
        logger.error( err );
        return DefaultResponse.errorFormat("500");
    }
    
};

const project_list = async (  ) => {

    try {

        let result = await db.query(
        `SELECT 
            project.id, 
            project.name, 
            project.description, 
            project.f_image_url,
            project.status, 
            DATE_FORMAT(project.added_time, '%Y-%m-%d %H:%i:%s') AS added_time, 
            DATE_FORMAT(project.updated_time, '%Y-%m-%d %H:%i:%s') AS updated_time
        FROM project
        ORDER BY project.id DESC`,
        [] // Empty params since we want all projects including deleted
        );


        return result;

    } catch ( err ) {
        logger.error( err );
        return DefaultResponse.errorFormat("500");
    }
    
};

const project_view = async ( id: number ) => {

    try {

        let result = await db.query(
        `
        SELECT 
            project.id, 
            project.name, 
            project.description,  
            project.status, 
            project.added_by, 
            DATE_FORMAT(project.added_time, '%Y-%m-%d %H:%i:%s') AS added_time, 
            project.updated_by, 
            DATE_FORMAT(project.updated_time, '%Y-%m-%d %H:%i:%s') AS updated_time
        FROM project
        WHERE project.id = ?
        `,
        [id]
        );

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

const project_active_list = async (  ) => {

    try {

        let result = await db.query(`SELECT project.id, project.name, project.description, project.status, project.added_by, DATE_FORMAT(project.added_time, '%Y-%m-%d %H:%i:%s') AS added_time, project.updated_by, DATE_FORMAT(project.updated_time, '%Y-%m-%d %H:%i:%s') AS updated_time
        FROM project
        WHERE project.status != ?  ORDER BY project.id DESC`, ["deleted"]);
        return result;

    } catch ( err ) {
        logger.error( err );
        return DefaultResponse.errorFormat("500");
    }
    
};

const project_status_change = async ( status: string, authUserId: number, id: number ) => {

    try {

        const currentDateTime = DateTime.now().setZone("Asia/Colombo").toFormat("y-MM-dd HH:mm:ss");
    
        let result = await db.query('UPDATE `project` SET status = ?, updated_by = ?, updated_time = ? WHERE id = ? ', [status, authUserId, currentDateTime, id]);

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
    project_add,
    project_edit,
    project_list,
    project_view,
    project_active_list,
    project_status_change,
}