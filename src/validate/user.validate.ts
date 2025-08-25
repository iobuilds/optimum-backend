import joi from "joi";
import { xssPrevent, validatePhoneNumber, isValidDateString, isValidTimeString } from "../utils/commonValidation";

const user_login = joi.object({

    email : joi.string()
        .min(1)
        .max(1000)
        .label("email")
        .messages({ 'string.min': 'wrong ' })
        .required()
    ,
    password : joi.string()
        .min(1)
        .max(1000)
        .label("password")
        .messages({ 'string.min': 'wrong ' })
        .required()
    ,

});

const user_add = joi.object({

    firstName: joi.string()
        .min(1)
        .max(100)
        .label("first name")
        .custom((value, helper) => {return xssPrevent(value);})
        .required()
    ,
    lastName: joi.string()
        .min(1)
        .max(100)
        .label("last name")
        .custom((value, helper) => {return xssPrevent(value);})
        .required()
    ,
    email: joi.string()
        .min(1)
        .max(200)
        .label("email")
        .required()
    ,
    phoneNumber: joi.string()
        .label("phone number")
        .custom((value, helper) => {
            if (!validatePhoneNumber(value)) {
                return helper.message({ custom: "phone number is incorrect"})
            }
            return value;
        })
        .required()
    ,
    password: joi.string()
        .min(1)
        .max(1000)
        .label("password")
        .messages({ 'string.min': 'wrong password' })
        .required()
    ,
    role: joi.number()
        .min(1)
        .max(2147483647)
        .label("role")
        .required()
    ,

});

const user_edit = joi.object({

    id: joi.number()
        .min(1)
        .max(2147483647)
        .label("id")
        .messages({ 'string.min': 'wrong id' })
        .required()
    ,
    firstName: joi.string()
        .min(1)
        .max(100)
        .label("first name")
        .custom((value, helper) => {return xssPrevent(value);})
        .required()
    ,
    lastName: joi.string()
        .min(1)
        .max(100)
        .label("last name")
        .custom((value, helper) => {return xssPrevent(value);})
        .required()
    ,
    email: joi.string()
        .min(1)
        .max(200)
        .label("email")
        .required()
    ,
    phoneNumber: joi.string()
        .label("phone number")
        .custom((value, helper) => {
            if (!validatePhoneNumber(value)) {
                return helper.message({ custom: "phone number is incorrect"})
            }
            return value;
        })
        .required()
    ,
    password: joi.string()
        .min(1)
        .max(1000)
        .label("password")
        .messages({ 'string.min': 'wrong password' })
        .required()
    ,
    role: joi.number()
        .min(1)
        .max(2147483647)
        .label("role")
        .required()
    ,

});

const user_list = joi.object({


});

const user_view = joi.object({

    id: joi.number()
        .min(1)
        .max(2147483647)
        .label("id")
        .messages({ 'string.min': 'wrong id' })
        .required()
    ,

});



const user_forget_password = joi.object({

    email: joi.string()
        .min(1)
        .max(1000)
        .label("E-mail")
        .messages({ 'string.min': 'wrong E-mail' })
        .email()
        .required()
    ,

});

const user_reset_password = joi.object({

    id: joi.number()
        .min(1)
        .max(2147483647)
        .label("id")
        .messages({ 'string.min': 'wrong id' })
        .required()
    ,
    password: joi.string()
        .min(6)
        .max(150)
        .label("password")
        .messages({ 'string.min': 'wrong password' })
        .required()
    ,
    tempKey: joi.string()
        .min(1)
        .max(100)
        .label("tempKey")
        .messages({ 'string.min': 'wrong tempKey' })
        .required()
    ,

});

export default {
    user_login,
    user_add,
    user_edit,
    user_list,
    user_view,
    user_forget_password,
    user_reset_password
}