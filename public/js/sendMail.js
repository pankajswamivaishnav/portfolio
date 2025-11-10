const nodemailer = require("nodemailer");
const sendUser = async (req, res) => {
  let { name, email, message } = req.body;

  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    var mailOptions = {
  from: `Website Contact Form <${process.env.EMAIL}>`,
  to: process.env.EMAIL, 
  subject: `New Message from ${name}`,
  text: `
You have received a new message from your website contact form.

Name: ${name}
Email: ${email}
Message:
${message}
  `,
  replyTo: email, 
};
 transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.error("Nodemailer error:", error);
    return res.status(500).json({ message: "Error sending email", error: error.toString() });
  } else {
    return res.render("index"); 
  }
});

  } catch (err) {
    console.log("backend catch error", err);
    res.status(500).send("Error");
  }
};

module.exports = { sendUser };
