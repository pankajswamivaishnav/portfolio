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
      from: process.env.EMAIL,
      to: email,
      subject: "New Message from " + name,
      text: message,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).send("Error sending email");
      } else {
        res.render("index");
      }
    });
  } catch (err) {
    console.log("backend catch error", err);
    res.status(500).send("Error");
  }
};

module.exports = { sendUser };
