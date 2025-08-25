import DefaultResponse from '../utils/DefaultResponse';
import { Response, NextFunction, Request } from 'express';
import { ExtendedRequest } from '../config/types';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import db from "../config/db";
import DeviceDetector from "node-device-detector";
import logger from '../config/logger';
import {validateIPAddress, xssPrevent} from "../utils/commonValidation";
import bcrypt from "bcrypt";
import { DateTime } from 'luxon';

const authenticate = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) { // 'Bearer' with capital 'B'
            const token = req.headers.authorization.split(' ')[1];

            if (token == null) {
                DefaultResponse.error(res, '401');
                return;
            }

            const check = new Promise<{ status: boolean; data?: any }>((resolve) => {
                jwt.verify(token, config.jwt_access_key, (err: any, data: any) => {
                    if (err) {
                        resolve({
                            status: false,
                        });
                    } else {
                        resolve({
                            status: true,
                            data: data,
                        });
                    }
                });
            });

            const data = await check;

            if (!data.status) {
                DefaultResponse.error(res, '401');
                return;
            }

            let hashToken = await bcrypt.hash( token.split('').reverse().join(''), config.pass_salt ); // Hash the token

            // Get data and check user and login session is true
            let maxAge = config.jwt_a_max_age;
            const currentDateTime = DateTime.now().setZone("UTC").toFormat("y-MM-dd HH:mm:ss");
            const result = await db.query(
                `
                SELECT user.id
                FROM user
                INNER JOIN user_login_session ON user_login_session.user_id = user.id
                WHERE user.status = 1 && user.id = ? && user.role = ? && user_login_session.token = ? && user_login_session.status = 1 && (DATE_ADD(login_time, INTERVAL ${maxAge} SECOND) > ?)`,
                [data.data.user, data.data.role, hashToken, currentDateTime]
            );

            if (!result.status) {
                DefaultResponse.error(res, '500');
                return;
            }

            if (!result.data || result.data.length === 0) {
                DefaultResponse.error(res, '403');
                return;
            }
            const detector = new DeviceDetector();
            const userAgentRes = detector.detect((req.headers['user-agent'] as string));
            data.data.osName = xssPrevent(userAgentRes.os.name || "");
            data.data.ipAddress = ((req.headers['x-forwarded-for'] as string) || '').split(',').pop()?.trim() || ''; // IP Address
            if(!validateIPAddress(data.data.ipAddress)) data.data.ipAddress = "";
            data.data.name = result.data[0].name;
            data.data.auth = result.data[0].auth;
            data.data.hashToken = hashToken;

            req.authorization = {
                data,
            };
            next();
        } else {
            DefaultResponse.error(res, '401');
        }
    } catch (err) {
        logger.error(err);
        return DefaultResponse.error(res, '500');
    }
};

export {
    authenticate
};
