require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const fs = require("fs")
const path = require("path");

const { adminRouter } = require("./routers/AdminRouter");
const { userRouter } = require("./routers/UserRouter");
const { patientRouter } = require("./routers/PatientRouter")
const { csRouter } = require("./routers/CsRouter")
const { souscriptionRouter } = require("./routers/SouscriptionRouter")
const { souscripteurRouter } = require("./routers/SouscripteurRouter");
const { ConsultationRouter } = require("./routers/ConsultationRouter");
const { AntecedentRouter } = require("./routers/AntecedentRouter");
const { PrescriptionRouter } = require("./routers/PrescriptionRouter");
const { ExamenRouter } = require("./routers/ExamenRouter");
const { DiagnosticsRouter } = require("./routers/DiagnosticsRouter");
const { SharedFileRouter } = require("./routers/SharedFileRouter");

const salt = parseInt(process.env.BCRYPT_SALT);
let dir = path.join(__dirname, 'uploads');

global.__basedir = __dirname;
app.use(bodyParser.json());
app.use(cors());


if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, 0744);
  fs.mkdirSync(dir + "/cs", 0744);
  fs.mkdirSync(dir + "/shared_files", 0744);
  fs.mkdirSync(dir + "/consultations", 0744);
  fs.mkdirSync(dir + "/cs/logos", 0744);
  fs.mkdirSync(dir + "/cs/authorizations", 0744);
  fs.mkdirSync(dir + "/consultations/examens", 0744);
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

app.use("/user", userRouter);
app.use("/patient", patientRouter);
app.use("/admin", adminRouter);
app.use("/cs", csRouter);
app.use("/souscription", souscriptionRouter);
app.use("/souscripteur", souscripteurRouter);
app.use("/consultation", ConsultationRouter);
app.use("/antecedent", AntecedentRouter);
app.use("/prescription", PrescriptionRouter);
app.use("/diagnostic", DiagnosticsRouter);
app.use("/examen", ExamenRouter);
app.use("/sharedfile", SharedFileRouter);

app.get("/crypt/:pwd", (req, res) => {
  const pwd = req.params.pwd;
  res.status(200).json({
    pwd_hashed: bcrypt.hashSync(pwd, salt),
  });
  return;
});

//listen
app.get('/mail', (req, res) => {
  res.sendFile(path.join(__dirname, "mail.html"));
  // res.write("ls,fm")

}).listen(process.env.PORT, () => {
  console.log("The server is working");
})

// error fallback route
app.use((err, req, res, next) => {
  console.log("err");
  if (err) {
    res.status(200).json({
      message: err.message,
      status: "failed",
    });
  }
});
