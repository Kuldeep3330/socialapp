import nodeMailer from "nodemailer";

const sendEmail = async (options) => {
    var transporter = nodeMailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "ca21b054d7efea",
          pass: "7940b9d0bbf916"
        }
      });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

export {sendEmail}