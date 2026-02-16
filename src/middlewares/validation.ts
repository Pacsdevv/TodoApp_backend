import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject } from "zod";

export const schemaValidation =
  (schema: AnyZodObject) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      return next(result.error);
    }

    req.body = result.data.body;

    next();
  };
