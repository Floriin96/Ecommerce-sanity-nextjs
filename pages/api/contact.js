import nodemailer from "nodemailer";
import {
  SMTP_MAIL_HOST,
  SMTP_MAIL_PASS,
  SMTP_MAIL_RECEIVER,
  SMTP_MAIL_SENDER,
} from "../../lib/config";

const transporter = nodemailer.createTransport({
  host: SMTP_MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: SMTP_MAIL_SENDER,
    pass: SMTP_MAIL_PASS,
  },
});

const getHtmlForm = (formData) => {
  return `<table>
  ${Object.entries(formData)
    .map(([key, value]) =>
      key
        ? `
      <tr>
          <td>${key[0].toUpperCase() + key.slice(1)}:</td>
          <td>${value}</td>
      </tr>
  `
        : ""
    )
    .join("")}
  </table>`;
};

export default async function handler(req, res) {
  const html = getHtmlForm(req.body);
  console.log(html);
  await transporter
    .sendMail({
      from: `'"${SMTP_MAIL_SENDER}" <${SMTP_MAIL_SENDER}>'`,
      to: SMTP_MAIL_RECEIVER,
      subject: "Contact Form",
      html,
    })
    .then(() => res.status(200).json({ data: "Success" }))
    .catch((error) => res.status(400).json({ error }));
}
