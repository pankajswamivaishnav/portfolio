const nodemailer = require("nodemailer");
const sendUser = async (req, res) => {
  let { name, email, message } = req.body;
  console.log(name, email, message);
  try {
    console.log("Enter In function");
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    console.log("Paar Transporter", transporter);
    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "New Message from " + name,
      text: message,
    };
    console.log("Paar mail options", mailOptions);
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("not sending properly", error);
        res.status(500).send("Error sending email");
      } else {
        res.send("Send Mail Successfully");
        console.log("Email sent: " + info.response);
        // do something useful
      }
    });
  } catch (err) {
    console.log("backend catch error", err);
    res.status(500).send("Error");
  }
};

module.exports = { sendUser };
