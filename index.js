require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const fs = require("fs")
const path = require("path");

const { adminRouter } = require("./routers/AdminRouter");
const { bookRouter } = require("./routers/BookRouter");
const { buyerRouter } = require("./routers/BuyerRouter");

const salt = parseInt(process.env.BCRYPT_SALT);
let dir = path.join(__dirname, 'uploads');

global.__basedir = __dirname;
app.use(bodyParser.json());
app.use(cors());


if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, 0744);

} else {
  console.log("Dev env : Upload folders already exists")
}

app.use('/uploads', express.static(dir))
app.use(express.static(path.join(__dirname, 'public')))

//Base de donnés et Models
require("./db").initiate().then(() => {
  try {
    require("./models/index").initModels()
  } catch (error) {
    console.log({ error })
  }
})

//routes
app.get("/", (req, res) => {
  res.status(200).send(".ok");
});

app.use("/admin", adminRouter);
app.use("/book", bookRouter);
app.use("/buyer", buyerRouter);

app.get("/crypt/:pwd", (req, res) => {
  const pwd = req.params.pwd;
  res.status(200).json({
    pwd_hashed: bcrypt.hashSync(pwd, salt),
  });
  return;
});

//listen
app.listen(process.env.PORT, () => {
  console.log("The server is working");
})

// error fallback route
app.use((err, req, res, next) => {
  console.log("err");
  if (err) {
    res.status(200).json({
      message: err.message,
      error: true,
    });
  }
});
