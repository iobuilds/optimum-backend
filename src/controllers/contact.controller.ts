// controllers/contact.controller.ts
import { Response } from "express";
import catchAsync from "../utils/catchAsync";
import validateInput from "../utils/validate";
import validate from "../validate/contact.validate";
import contactService from "../services/contact.service";
import logger from '../config/logger';
import { ExtendedRequest } from "../config/types";
import DefaultResponse from "../utils/DefaultResponse";

const createContact = catchAsync(async (req: ExtendedRequest, res: Response) => {

    try{

        /**
         * @detail
         * Input Validation
         */
        const data = await validateInput(req.body, validate.contact_add);
        console.log(data)
        if (!data.status) {
            res.status(200).send( data );
            return;
        }

        
        
        /**
         * @detail
         * Service function call
         */
        const result = await contactService.contactService( data.data );
        res.status(200).send( result );

    } catch (err){
        logger.error(err);
        DefaultResponse.error(res, "500");
    }
       
});

export default {
  createContact,
};
