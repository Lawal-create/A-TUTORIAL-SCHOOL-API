import Joi from "joi";
import mongoose from "mongoose";

export const checkMongoId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

//custom method to validate mongo ids in Joi
export const checkMongoIdMethod: Joi.CustomValidator<string> = (
  value,
  helpers
): string | Joi.ErrorReport => {
  return checkMongoId(value) ? value : helpers.error("any.invalid");
};
