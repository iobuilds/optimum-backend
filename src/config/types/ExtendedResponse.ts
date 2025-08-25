import { Response } from "express";

export interface ExtendedResponse extends Response {
    defaultResponse: (status:number, body: string | {}) => void;
}