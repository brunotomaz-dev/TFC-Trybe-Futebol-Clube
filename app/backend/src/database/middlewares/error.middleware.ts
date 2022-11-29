import { NextFunction, Request, Response } from 'express';
import { RestError } from 'restify-errors';

const errorMiddleware = (err: RestError, _req: Request, res: Response, _next: NextFunction) => {
  const { statusCode, message } = err;

  res.status(statusCode).json({ message });
};

export default errorMiddleware;
