import { config } from "dotenv";

config();

export const SMTP_MAIL_SENDER = process.env.SMTP_MAIL_SENDER
export const SMTP_MAIL_PASS = process.env.SMTP_MAIL_PASS
export const SMTP_MAIL_RECEIVER = process.env.SMTP_MAIL_RECEIVER
export const SMTP_MAIL_HOST = process.env.SMTP_MAIL_HOST