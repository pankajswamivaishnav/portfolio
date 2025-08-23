require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./db/conn");
const userData = require("./models/schema");

// HBS OR Partials Setup
const path = require("path");
const staticPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views/");
const partialsPath = path.join(__dirname, "../templates/partials/");

const hbs = require("hbs");
const { sendUser } = require("../public/js/sendMail");

app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/save", async (req, res) => {
  try {
    const data = new userData({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    const result = await data.save();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(404).render("404");
  }
});

app.post("/sendEmail", sendUser);

module.exports = app;

// app.listen(port, () => {
//   console.log(`server started at port number ${port}`);
// });
