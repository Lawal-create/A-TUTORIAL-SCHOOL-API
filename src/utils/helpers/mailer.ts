import nodemailer from "nodemailer";
import {
  nodemailerUser,
  clientId,
  clientSecret,
  refreshToken,
  redirectUrl
} from "../../config/index";
import logger from "../logger";
import { google } from "googleapis";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUrl
);
oAuth2Client.setCredentials({ refresh_token: refreshToken });

export interface EmailOptions {
  from: string;
  to: string | string[];
  subject: string;
  body: string;
}

const sendMail = async ({
  from,
  to,
  subject,
  body
}: EmailOptions): Promise<void> => {
  const { token } = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: nodemailerUser,
      clientId: clientId,
      clientSecret: clientSecret,
      refreshToken: refreshToken,
      accessToken: token
    }
  } as SMTPTransport.Options);

  logger.info(`Sending email from ${from} to ${to}`);

  await transporter.verify();
  await transporter.sendMail({
    from: `School Tutorial <${from}>`,
    to,
    subject: `${subject} - School Tutorial`,
    html: body
  });

  logger.info("Email sent successfully");
};

export default sendMail;
