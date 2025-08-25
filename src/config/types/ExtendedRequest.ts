import { Request } from "express";

export interface ExtendedRequest extends Request {
    authorization?: {
        data: object;
    };
}