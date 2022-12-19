import { App } from "@tinyhttp/app";
import nodemailer from "nodemailer";
import express from "express";
import cors from 'cors'
import {
  SMTP_MAIL_HOST,
  SMTP_MAIL_PASS,
  SMTP_MAIL_RECEIVER,
  SMTP_MAIL_SENDER,
} from "./config/index.mjs";

const app = new App();

app.use(express.json(), cors())

const transporter = nodemailer.createTransport({
  host: SMTP_MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: SMTP_MAIL_SENDER,
    pass: SMTP_MAIL_PASS,
  },
});


app
  .post("/api/contact", async (req, res) => {

    const { message } = req.body;

    if (!message) {
      return res.status(400).send("Please fill all the fields");
    }

    await transporter

      .sendMail({
        from: `'"${SMTP_MAIL_SENDER}" <${SMTP_MAIL_SENDER}>'`,
        to: SMTP_MAIL_RECEIVER,
        subject: "Portfolio Contact Form",
        html: `${message}`,
      })
      .then(() => res.status(200).send("Success"))
      .catch((e) => res.status(400).send(e));
  })


app.listen(3300)