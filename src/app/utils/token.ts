import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { Types } from 'mongoose';

export type TJwtPayload = JwtPayload & {
  _id: Types.ObjectId;
  email: string;
  role: string;
};

export const createToken = (
  payload: object,
  secret: string,
  expiresIn: SignOptions['expiresIn']
) => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string, secret: string): TJwtPayload => {
  return jwt.verify(token, secret) as TJwtPayload;
};
