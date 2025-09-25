import joi from "joi";
import { xssPrevent, validatePhoneNumber } from "../utils/commonValidation";

const contact_add = joi.object({

    name: joi.string()
        .min(1)
        .max(200)
        .label("name")
        .custom((value, helper) => { return xssPrevent(value); })
        .required()
    ,

    email: joi.string()
        .email()
        .min(5)
        .max(200)
        .label("email")
        .custom((value, helper) => { return xssPrevent(value); })
        .required()
    ,

    phone: joi.string()
        .min(1)
        .max(2147483647)
        .label("phone number")
        .custom((value, helper) => {
            if (!validatePhoneNumber(value)) {
                return helper.message({ custom: "phone number is incorrect"})
            }
            return value;
        })
        .required()
    ,

    service_type: joi.string()
        .min(1)
        .max(100)
        .label("service type")
        .custom((value, helper) => { return xssPrevent(value); })
        .required()
    ,

    message: joi.string()
        .min(1)
        .max(1000)
        .label("message")
        .custom((value, helper) => { return xssPrevent(value); })
        .required()
    ,

});

export default {
    contact_add,
    
}