import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { USER_STATUS, UserRole } from '../types/user.types';
import AppError from '../error/AppError';
import User from '../modules/User/user.model';
import config from '../config';
import { verifyToken } from '../utils/token';
import httpStatus from 'http-status';

const auth = (...roles: UserRole[]) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) throw new AppError(401, 'You are not authorized!');

    const decoded = verifyToken(token, config.jwt_access_secret! as string);

    const user = await User.findOne({ email: decoded.email });
    if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    if (user.status === USER_STATUS.INACTIVE)
      throw new AppError(httpStatus.FORBIDDEN, 'Your account is inactive!');
    if (user.isDeleted)
      throw new AppError(httpStatus.FORBIDDEN, 'User Not Found!');

    if (roles.length && !roles.includes(decoded.role as UserRole)) {
      throw new AppError(httpStatus.FORBIDDEN, 'Forbidden!');
    }

    req.user = decoded;
    next();
  });

export default auth;
