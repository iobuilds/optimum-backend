import authorization from '../json/authorization.json';
import DefaultResponse from './DefaultResponse';
import { Request } from 'express';

const authorize = (module:string, key:string, req:Request) => {

    let authorizeResponse = {
        status: false,
        data: {
            role: 0,
            user: 0,
            hashToken: ""
        }
    }
    if(req['authorization' as keyof typeof req]){
        authorizeResponse.data.role = req['authorization' as keyof typeof req].data.data.role;
        authorizeResponse.data.user = req['authorization' as keyof typeof req].data.data.user;
        authorizeResponse.data.hashToken = req['authorization' as keyof typeof req].data.data.hashToken;
    }

    let module_obj = authorization[module as keyof typeof authorization];
    if (module_obj) {
        let key_arr = module_obj[key as keyof typeof module_obj] as any[];
        if (key_arr) {
            if (key_arr.includes(authorizeResponse.data.role)) {
                authorizeResponse.status = true;
                return authorizeResponse;
            } else {
                return authorizeResponse;
            }
        } else {
            return authorizeResponse;
        }
    } else {
        return authorizeResponse;
    }

}

export default authorize;