import projectModel from "../models/project.model";
import DefaultResponse from "../utils/DefaultResponse";
import logger from '../config/logger';
import {project_add_data, project_edit_data, project_list_data, project_view_data, project_active_list_data, project_status_change_data, project_delete_data} from "../config/types/project";

const project_add = async ( data: project_add_data ) => {

    try {

        let result;
        result = await projectModel.project_add( data.name, data.status, data.description, data.authUserId );
        return result;

    } catch (err) {
        logger.error(err);
        return DefaultResponse.errorFormat("500");
    }
};

const project_edit = async ( data: project_edit_data ) => {

    try {

        let result;
        result = await projectModel.project_edit(  data.name, data.status, data.description, data.authUserId,data.id );
        return result;

    } catch (err) {
        logger.error(err);
        return DefaultResponse.errorFormat("500");
    }
};

const project_list = async ( data: project_list_data ) => {

    try {

        let result;
        result = await projectModel.project_list(  );
        return result;

    } catch (err) {
        logger.error(err);
        return DefaultResponse.errorFormat("500");
    }
};

const project_view = async ( data: project_view_data ) => {

    try {

        let result;
        result = await projectModel.project_view( data.id );
        return result;

    } catch (err) {
        logger.error(err);
        return DefaultResponse.errorFormat("500");
    }
};

const project_active_list = async ( data: project_active_list_data ) => {

    try {

        let result;
        result = await projectModel.project_active_list(  );
        return result;

    } catch (err) {
        logger.error(err);
        return DefaultResponse.errorFormat("500");
    }
};

const project_status_change = async ( data: project_status_change_data ) => {

    try {

        let result;
        result = await projectModel.project_status_change( data.status, data.authUserId, data.id );
        return result;

    } catch (err) {
        logger.error(err);
        return DefaultResponse.errorFormat("500");
    }
};

const project_delete = async ( data: project_delete_data ) => {

    try {

        let result;
        result = await projectModel.project_status_change( data.status, data.authUserId, data.id );
        return result;

    } catch (err) {
        logger.error(err);
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
    project_delete
}