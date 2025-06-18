// services/sendReminderEmail.js
const nodemailer = require("nodemailer");

const sendReminderEmail = async (email, name) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"CF Tracker" <${process.env.GMAIL_ID}>`,
    to: email,
    subject: "⏰ Keep Up With Your Codeforces Practice!",
    html: `<p>Hi ${name},</p>
           <p>We noticed you haven’t submitted anything on Codeforces in the last 7 days.</p>
           <p>Don't fall behind—get back to solving and improving!</p>
           <p>Best,<br/>CF Tracker Bot</p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendReminderEmail;
