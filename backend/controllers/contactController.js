const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("../env");

const sendContactEmail = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  let mailOptions = {
    from: `${name} <${email}>`,
    to: "", // add admin email address to receive the contact
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      throw new Error("Failed to send mail");
    } else {
      console.log("Email sent:" + info.response);
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
});

module.exports = {
  sendContactEmail,
};
