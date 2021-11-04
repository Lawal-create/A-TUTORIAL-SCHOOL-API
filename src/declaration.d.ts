declare namespace NodeJS {
  // Merge the existing `ProcessEnv` definition with ours
  // Any variable declared in the .env file here should be typed in the interface below
  export interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PORT: string;
    MONGO_URI: string;
    AWS_ACCESS_ID: string;
    AWS_ACCESS_KEY: string;
    AWS_BUCKET_NAME: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    BCRYPT_SALT: string;
    REFRESH_TOKEN_EXPIRES_IN: string;
    PASSWORD_RESET_TOKEN_EXPIRES_IN: string;
    NODEMAILER_USER: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    REFRESH_TOKEN: string;
    REDIRECT_URL: string;
    FRONTENDBASEURL: string;
  }
}
