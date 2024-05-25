const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7649bb27f6879c",
      pass: "3a18e03783b601"
    }
  });

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: 'authUser@pexpenses.com',
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

module.exports = sendEmail;
