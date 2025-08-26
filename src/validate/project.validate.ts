import joi from "joi";
import { xssPrevent, validatePhoneNumber, isValidDateString, isValidTimeString } from "../utils/commonValidation";

const project_add = joi.object({

    name: joi.string()
        .min(1)
        .max(200)
        .label("name")
        .custom((value, helper) => {return xssPrevent(value);})
        .required()
    ,
    description: joi.string()
        .min(1)
        .max(5000)
        .label("description")
        .custom((value, helper) => {return xssPrevent(value);})
        .allow("")
        .allow(null)
    ,
    status: joi.string()
        .min(1)
        .max(100)
        .label("status")
        .custom((value, helper) => {return xssPrevent(value);})
    ,

});

const project_edit = joi.object({

    id: joi.number()
        .min(1)
        .max(2147483647)
        .label("id")
        .messages({ 'string.min': 'wrong id' })
        .allow()
    ,
    name: joi.string()
        .min(1)
        .max(200)
        .label("name")
        .custom((value, helper) => {return xssPrevent(value);})
        .required()
    ,
    description: joi.string()
        .min(1)
        .max(5000)
        .label("description")
        .custom((value, helper) => {return xssPrevent(value);})
        .allow("")
        .allow(null)
    ,
    status: joi.string()
        .min(1)
        .max(100)
        .label("status")
        .custom((value, helper) => {return xssPrevent(value);})
    ,

});

const project_list = joi.object({


});

const project_view = joi.object({

    id: joi.number()
        .min(1)
        .max(2147483647)
        .label("id")
        .messages({ 'string.min': 'wrong id' })
        .required()
    ,

});

const project_active_list = joi.object({


});

const project_status_change = joi.object({
    id: joi.number()
        .min(1)
        .max(2147483647)
        .label("id")
        .messages({ 'string.min': 'wrong id' })
        .required()
    ,
    status: joi.string()
        .min(1)
        .max(100)
        .label("status")
        .custom((value, helper) => {return xssPrevent(value);})
    ,

});

const project_delete = joi.object({
    id: joi.number()
        .min(1)
        .max(2147483647)
        .label("id")
        .messages({ 'string.min': 'wrong id' })
        .required()
    ,
    status: joi.string()
        .min(1)
        .max(100)
        .label("status")
        .custom((value, helper) => {return xssPrevent(value);})
    ,

});

export default {
    project_add,
    project_edit,
    project_list,
    project_view,
    project_active_list,
    project_status_change,
    project_delete
}