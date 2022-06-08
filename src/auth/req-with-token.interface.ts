/* eslint-disable import/no-extraneous-dependencies */
import { Request } from 'express';
import { IJwtPayload } from './jwt-payload.interface';

export interface IReqWithToken extends Request {
    user: IJwtPayload;
}
