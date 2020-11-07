import nodemailer from 'nodemailer';

export const settings = {
  url: `${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/a/users/verify`,
  handleCodeInApp: true
};
export const buildEmailLink = (email, link) => ({
  to: email,
  subject: 'Your One-Time sign-in link',
  html: `<a href="${link}">${link}</a>`,
  text: link
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
    from: `"#EndSARS Archive Team" <${auth.user}>`,
    to,
    subject,
    text,
    html
  });
  return info;
};

export default sendMail;
