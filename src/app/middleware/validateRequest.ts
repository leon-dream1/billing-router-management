/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

const validateRequest = (schema: ZodSchema) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parsed = (await schema.parseAsync({
      body: req.body,
      params: req.params,
      query: req.query,
    })) as Record<string, any>;

    req.body = parsed.body ?? req.body;
    req.params = (parsed.params ?? req.params) as any;
    req.query = (parsed.query ?? req.query) as any;

    next();
  });
};

export default validateRequest;
