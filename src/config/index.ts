import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT;
export const nodeEnv = process.env.NODE_ENV;
export const dbName = process.env.DB_NAME || "";
export const dbUsername = process.env.DB_USERNAME || "";
export const dbPassword = process.env.DB_PASSWORD || "";
export const dbDialect = process.env.DB_DIALECT || "";
export const dbHost = process.env.DB_HOST || "";
export const awsID = process.env.AWS_ACCESS_ID || "";
export const awsKey = process.env.AWS_ACCESS_KEY || "";
export const awsBucket = process.env.AWS_BUCKET_NAME || "";
export const jwtSecret = process.env.JWT_SECRET || "";
export const jwtExpiresIn = Number(process.env.JWT_EXPIRES_IN) || "";
export const bcryptSalt = Number(process.env.BCRYPT_SALT) || "";
export const refreshTokenExpiresIn =
  Number(process.env.REFRESH_TOKEN_EXPIRES_IN) || 0;
export const resetTokenExpiresIn =
  Number(process.env.PASSWORD_RESET_TOKEN_EXPIRES_IN) || 0;
export const nodemailerUser = process.env.NODEMAILER_USER || "";
export const clientId = process.env.CLIENT_ID || "";
export const clientSecret = process.env.CLIENT_SECRET || "";
export const refreshToken = process.env.REFRESH_TOKEN || "";
export const redirectUrl = process.env.REDIRECT_URL || "";
export const frontendBaseUrl = process.env.FRONTENDBASEURL || "";
