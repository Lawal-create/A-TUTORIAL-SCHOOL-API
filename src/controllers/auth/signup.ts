import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../../models/userModel";
import { UploadFile } from "../../types/global";
import { SignupUserRequestData } from "../../types/requests";
import { generateHashedValue } from "../../utils/helpers/auth";
import logger from "../../utils/logger";
import formatLog from "../../utils/logger/formatLog";
import { successResponse } from "../../utils/responses";
import { getBasicUserDetails } from "../../utils/helpers/auth";
import sendMail from "../../utils/helpers/mailer";
import { nodemailerUser } from "../../config";

//Sign Up a User
const signupUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info(formatLog(req, "START: Register User Service"));
    const {
      email,
      password,
      firstName,
      lastName,
      role,
      phoneNumber,
      gender
    }: SignupUserRequestData = req.body;

    const profileImageUrl = req.file
      ? (req.file as UploadFile).location
      : `https://ui-avatars.com/api?name=${firstName}-${lastName}`;

    const user: IUser = new User({
      email,
      firstName,
      role,
      phoneNumber,
      gender,
      lastName,
      profileImageUrl,
      password: generateHashedValue(password)
    });

    logger.info(formatLog(req, "Saving new user account"));
    await user.save();
    await sendMail({
      from: nodemailerUser,
      to: email,
      subject: "Welcome to school tutorial",
      body: `Hi ${user.firstName},<br>
    You've successfully signed up to the TroveTest app<br>
    Login to get started in making valuable investments. 
    `
    });

    logger.info(formatLog(req, "END: Register User Service"));
    return successResponse(
      res,
      201,
      "Successfully created user account",
      getBasicUserDetails(user)
    );
  } catch (err) {
    next(err);
  }
};

export default signupUser;
