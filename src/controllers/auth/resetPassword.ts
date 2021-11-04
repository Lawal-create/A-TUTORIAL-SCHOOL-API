import { NextFunction, Request, Response } from "express";
import ApiError from "../../middlewares/errorHandler/ApiError";
import User, { IUser } from "../../models/userModel";
import { generateHashedValue } from "../../utils/helpers/auth";
import logger from "../../utils/logger";
import formatLog from "../../utils/logger/formatLog";
import { successResponse } from "../../utils/responses";

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info(formatLog(req, "START: Reset Password Service"));

    const { password, passwordResetToken } = req.body;

    logger.info(formatLog(req, "Updating user password"));
    const user: IUser = await User.findOneAndUpdate(
      {
        passwordResetToken: passwordResetToken,
        passwordResetExpires: { $gte: new Date().toISOString() }
      },
      {
        password: generateHashedValue(password),
        passwordChangedAt: new Date(),
        passwordResetToken: null,
        passwordResetExpires: null
      }
    ).lean();

    if (!user)
      return next(
        ApiError.badRequest("Invalid / Expired password reset token")
      );

    logger.info(formatLog(req, "END: Reset Password Service"));
    return successResponse<null>(
      res,
      200,
      "Password reset successful. Please login with the new password.",
      null
    );
  } catch (err) {
    next(err);
  }
};

export default resetPassword;
