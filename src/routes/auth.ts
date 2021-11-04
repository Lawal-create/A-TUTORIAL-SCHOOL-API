import express, { Router } from "express";
import forgotPassword from "../controllers/auth/forgetPassword";
import loginUser from "../controllers/auth/login";
import resetPassword from "../controllers/auth/resetPassword";
import signupUser from "../controllers/auth/signup";
import joiMiddleware from "../middlewares/joiMiddleware";
import upload from "../utils/aws";
import {
  forgotPasswordValidator,
  loginValidator,
  resetPasswordValidator,
  signupValidator
} from "../validator/authSchemas";

const authRouter: Router = express.Router();
authRouter.post("/login", joiMiddleware(loginValidator), loginUser);

authRouter.post(
  "/signup",
  upload.single("profileImageUrl"),
  joiMiddleware(signupValidator),
  signupUser
);
authRouter.post(
  "/forgot-password",
  joiMiddleware(forgotPasswordValidator),
  forgotPassword
);
authRouter.post(
  "/reset-password",
  joiMiddleware(resetPasswordValidator),
  resetPassword
);

export default authRouter;
