import { Response } from 'express';
import response from './../json/response.json';

function success(res: Response, code: string = '200', data: any = '', status: number = 200): void {
  
    let responseBody: { status: boolean; code?: string; message?: string, data?: any } = {
        status: true
    };
    responseBody.code = code;
    // Response message
    const responseMessage = response[code as keyof typeof response];
    if (responseMessage) {
        responseBody.message = responseMessage;
    } else {
        responseBody.message = 'Success'; // Provide a default message if the code is not found
    }

    // Response Data
    if( data != '') {
        responseBody.data = data;
    }
    
    res.status(status).send(responseBody);

}

function error(res: Response, code: string = '200', msg: any = '', status: number = 200): void {

    let responseBody: { status: boolean; code?: string; message?: string, data?: any } = {
        status: false
    };

    responseBody.code = code;
    // Response message
    if (code === '000') {
        responseBody.message = msg;
    } else {
        const responseMessage = response[code as keyof typeof response];
        if (responseMessage) {
            responseBody.message = responseMessage;
        } else {
            responseBody.message = 'Success'; // Provide a default message if the code is not found
        }
    }
    
    res.status(status).send(responseBody);
}

function successFormat(code: string = '200', data: any = '') {
  
    let responseBody: { status: boolean; code?: string; message?: string, data?: any } = {
        status: true
    };
    responseBody.code = code;
    // Response message
    const responseMessage = response[code as keyof typeof response];
    if (responseMessage) {
        responseBody.message = responseMessage;
    } else {
        responseBody.message = 'Success'; // Provide a default message if the code is not found
    }

    // Response Data
    if( data != '') {
        responseBody.data = data;
    }
    
    return (responseBody);

}

function errorFormat(code: string = '200', msg: any = '', data: any = "") {

    let responseBody: { status: boolean; code?: string; message?: string, data?: any } = {
        status: false
    };
    responseBody.code = code;
    // Response message
    if (code === '000') {
        responseBody.message = msg;
        responseBody.data = data;
    } else {
        const responseMessage = response[code as keyof typeof response];
        if (responseMessage) {
            responseBody.message = responseMessage;
        } else {
            responseBody.message = 'Success'; // Provide a default message if the code is not found
        }
    }
    
    return(responseBody);
}

export default {
  success,
  error,
  successFormat,
  errorFormat
};
