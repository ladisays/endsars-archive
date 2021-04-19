import nodemailer from 'nodemailer';

import Invitation from './templates/InvitationMail';
import Verification from './templates/VerificationMail';

export const settings = {
  url: `${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/a/users/verify`,
  handleCodeInApp: true
};

export const buildInvitationMail = (email, link) => ({
  to: email,
  subject: 'Your One Time sign-in link',
  html: Invitation.getHTML(link),
  text: Invitation.getText(link)
});

export const buildVerificationMail = (to, code, link) => ({
  to,
  subject: `Your Verification Code - ${code.toUpperCase()}`,
  html: Verification.getHTML(code, link),
  text: Verification.getText(code, link)
});

const sendMail = async ({ to, subject, text, html }) => {
  const auth = {
    user: process.env.MAIL_SENDER,
    pass: process.env.MAIL_SENDER_PASS
  };
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    host: 'smtp.gmail.com',
    auth
  });

  const info = await transporter.sendMail({
    from: `"#ENDSARS Archived" <${auth.user}>`,
    to,
    subject,
    text,
    html
  });
  return info;
};

export default sendMail;
