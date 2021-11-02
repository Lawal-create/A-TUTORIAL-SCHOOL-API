import { NextFunction, Request, Response } from "express";
import ApiError from "./errorHandler/ApiError";

const parseJSON = (
  fields: string[]
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // to track current field being parsed
    let currentIndex = 0;

    try {
      for (const field of fields) {
        currentIndex += 1;

        if (!req.body[field]) continue;

        //handle non-string edge case
        if (typeof req.body[field] !== "string") return next();
        req.body[field] = JSON.parse(req.body[field]);

        //parse field again if it's over-stringified
        if (typeof req.body[field] === "string") {
          req.body[field] = JSON.parse(req.body[field]);
        }
      }

      next();
    } catch (err) {
      next(
        ApiError.badRequest(
          `${fields[currentIndex]} must be in valid JSON format. ${
            (err as any).message
          }`
        )
      );
    }
  };
};

export default parseJSON;
