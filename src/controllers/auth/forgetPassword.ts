import { NextFunction, Request, Response } from "express";
import { resetTokenExpiresIn } from "../../config";
import ApiError from "../../middlewares/errorHandler/ApiError";
import User, { IUser } from "../../models/userModel";
import { generateRandomToken } from "../../utils/helpers/auth";
import logger from "../../utils/logger";
import formatLog from "../../utils/logger/formatLog";
import { successResponse } from "../../utils/responses";
import sendMail from "../../utils/helpers/mailer";
import { nodemailerUser } from "../../config";
import { frontendBaseUrl } from "../../config";

const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info(formatLog(req, "START: Forgot Password Service"));

    logger.info(
      formatLog(req, "Updating user with new reset token and expiry date")
    );

    const resetToken = generateRandomToken();
    const user: IUser = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        passwordResetToken: resetToken,
        passwordResetExpires: new Date(
          Date.now() + resetTokenExpiresIn * 60000
        ).toISOString()
      }
    ).lean();

    if (!user) return next(ApiError.badRequest("User does not exist"));
    await sendMail({
      from: nodemailerUser,
      to: req.body.email,
      subject: "Reset your password",
      body: `
    Hi ${user.firstName},<br>
    Please use the link below to reset your password<br><br>
    ${frontendBaseUrl}/reset-password?token${resetToken}
     `
    });

    logger.info(formatLog(req, "END: Forgot Password Service"));
    return successResponse<null>(
      res,
      200,
      `An email has been sent to ${req.body.email}. Follow the instructions in it to reset your password.`,
      null
    );
  } catch (err) {
    next(err);
  }
};

export default forgotPassword;
