import { Request, Response, NextFunction } from 'express';

export const catchExceptions = (func: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res)).catch(next);
  }
}