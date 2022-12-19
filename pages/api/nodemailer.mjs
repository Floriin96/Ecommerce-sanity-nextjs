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

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const transporter = nodemailer.createTransport({
  host: SMTP_MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: SMTP_MAIL_SENDER,
    pass: SMTP_MAIL_PASS,
  },
});

const getHtmlItems = (cartItems) => {
  let rows = cartItems.map(({ details, name, price, quantity, size }, item) => `
      <tr>
          <td>Name:</td>
          <td>${name}</td>
      </tr>
      <tr>
          <td>Details:</td>
          <td>${details}</td>
      </tr>
      <tr>
          <td>Price:</td>
          <td>${price}</td>
      </tr>
      <tr>
          <td>Quantity:</td>
          <td>${quantity}</td>
      </tr>
      <tr>
          <td>Size:</td>
          <td>${size}</td>
      </tr>
  `).join('')
  return `<table>${rows}</table>`
}
const getHtmlForm = (formData) => {
  return `<table>
  ${Object.entries(formData).map(([key, value]) => key ? `
      <tr>
          <td>${key}:</td>
          <td>${value}</td>
      </tr>
  ` : '').join('')}
  </table>`
}

const getHtml = ({ formData, cartItems }) => {
  const htmlForm = getHtmlForm(formData)
  const htmlItems = getHtmlItems(cartItems)
  const html = htmlForm + "<table style='height: 2px; width: 100%; background: black;'></table>" + htmlItems
  return html;
}

app.get("*",  (req, res) => res.send(req.hostname + "--" + req.path))

app
  .post("/api/contact", async (req, res) => {
    try {

      const { message } = req.body;
      console.log(message, typeof message)
  
      if (!message) {
        return res.status(400).send("Please fill all the fields");
      }
  
      await transporter
        .sendMail({
          from: `'"${SMTP_MAIL_SENDER}" <${SMTP_MAIL_SENDER}>'`,
          to: SMTP_MAIL_RECEIVER,
          subject: "Portfolio Contact Form",
          html: getHtml(message),
        })
        .then(() => res.status(200).send("Success"))
        .catch((e) => res.status(400).send(e));
    } catch (error) {
      console.error(error)
      res.json({ error })
    }
  })

const PORT = 3300
app.listen(PORT, () => console.log("Running in port " + PORT))