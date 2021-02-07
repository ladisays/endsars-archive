import nodemailer from 'nodemailer';

import { htmlTemplate, textTemplate } from './verification-mail-template';

export const settings = {
  url: `${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/a/users/verify`,
  handleCodeInApp: true
};
export const buildEmailLink = (email, link) => ({
  to: email,
  subject: 'Your One Time sign-in link',
  html: `<a href="${link}">${link}</a>`,
  text: link
});

export const buildVerificationMail = (to, code, link) => ({
  to,
  subject: `Your Verification Code - ${code.toUpperCase()}`,
  html: htmlTemplate(code, link),
  text: textTemplate(code, link)
});

const sendMail = async ({ to, subject, text, html }) => {
  const auth = {
    user: process.env.MAIL_SENDER,
    pass: process.env.MAIL_SENDER_PASS
  };
  console.log(auth);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    host: 'smtp.gmail.com',
    auth
  });

  const info = await transporter.sendMail({
    from: `"ENDSARS Archived Team" <${auth.user}>`,
    to,
    subject,
    text,
    html
  });
  return info;
};

export default sendMail;
