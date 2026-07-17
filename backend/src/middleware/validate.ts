import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

type RequestPart = "body" | "params" | "query";

export const validate =
  (schema: ZodType, part: RequestPart = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[part]);

    if (!result.success) {
      return next(result.error);
    }

    req[part] = result.data;
    return next();
  };
