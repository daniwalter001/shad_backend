const patientRouter = require("express").Router();
const bcrypt = require("bcrypt");
const e = require("express");

const salt = parseInt(process.env.BCRYPT_SALT);

const {
  checkPatient,
  addPatient,
  deletePatientByToken,
  getPatients,
  getPatientByToken,
  updatePatientByToken,
  authPatient,
  getPatientsByCsToken,
} = require("../controllers/PatientController");
const { send } = require("../helpers/mail/mailsender");

const {
  addPatientValidator,
  patientLoginValidator,
} = require("../validators/PatientValidator");

patientRouter
  .post("/add", addPatientValidator, async (req, res, next) => {
    try {
      let check = await checkPatient(req.body);
      console.log(check)
      if (check) {
        let user = await addPatient(req.body);

        if (user) {
          send(user?.email ?? '', { patient: user }, 'AJOUT_PATIENT')
        }

        res.status(200).json({
          data: user,
          success: true,
          message: "Patient ajouté avec succès",
        });
        return;
      } else {
        res.status(200).json({
          message: "Opération non aboutie! Le patient existe peut-être déjà",
          error: true,
        });
        return;
      }
    } catch (err) {
      console.log(err);
      res.status(200).json({
        data: err,
        error: true,
        message: "Echec de l'operation de l'ajout de patient",
      });
      return;
    }
  })
  .post("/login", patientLoginValidator, async (req, res, next) => {
    try {
      const check = await authPatient(req.body);

      if (check) {
        res.status(200).json({
          success: true,
          message: "Connexion validée",
          data: check,
        });
        return;
      } else {
        res.status(200).json({
          error: true,
          message: "Email ou mot de passe incorrect",
          data: req.body,
        });
        return;
      }
    } catch (err) {
      res.status(200).json({
        error: true,
        message: "Operation non aboutie",
        data: err,
      });
      return;
    }
  })
  .delete("/delete/:token", async (req, res) => {
    try {
      let _ = await deletePatientByToken(req.params?.token);
      if (_.length != 0) {
        return res.status(200).json({
          success: true,
        });
      }
    } catch (err) {
      return res.status(200).json({
        data: err,
        error: true,
      });
    }
  })
  .patch("/update/:token", async (req, res) => {
    try {
      let _ = await updatePatientByToken(req.params?.token, req.body);
      if (_.length != 0) {
        return res.status(200).json({
          success: true,
        });
      }
    } catch (err) {
      return res.status(200).json({
        data: err,
        error: true,
      });
    }
  })
  .get("/all", async (req, res) => {
    try {
      let _ = await getPatients();
      if (_.length != 0) {
        return res.status(200).json({
          success: true,
          data: _,
        });
      } else {
        return res.status(200).json({
          success: true,
          patients: [],
        });
      }
    } catch (err) {
      return res.status(200).json({
        data: err,
        error: true,
      });
    }
  })
  .get("/cs/:cs_token", async (req, res) => {
    try {
      let _ = await getPatientsByCsToken(req.params?.cs_token);
      if (_.length != 0) {
        return res.status(200).json({
          success: true,
          data: _,
        });
      } else {
        return res.status(200).json({
          success: true,
          patients: [],
        });
      }
    } catch (err) {
      return res.status(200).json({
        data: err,
        error: true,
      });
    }
  })
  .get("/:token", async (req, res) => {
    try {
      let _ = await getPatientByToken(req.params?.token);
      if (_.length != 0) {
        return res.status(200).json({
          success: true,
          data: _,
        });
      }
    } catch (err) {
      return res.status(200).json({
        data: err,
        error: true,
      });
    }
  });

module.exports = { patientRouter };
