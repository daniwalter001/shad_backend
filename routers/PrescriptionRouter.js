const PrescriptionRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { checkConsultationByToken, getConsultationByToken } = require("../controllers/ConsultationController");
const { checkPatientByToken } = require("../controllers/PatientController");
const { updatePrescriptionByToken, getPrescriptionByToken, deletePrescriptionByToken, getPrescriptionsBy, addPrescription } = require("../controllers/PrescriptionController");
const { getUserByToken } = require("../controllers/UserController");
const { CONSULTATION_STATUS } = require("../helpers/constants");
const { addPrescriptionValidator } = require("../validators/PrescriptionValidator");

const salt = parseInt(process.env.BCRYPT_SALT);

PrescriptionRouter.post("/add", addPrescriptionValidator, async (req, res, next) => {
  try {

    let prescription_data = req?.body ?? {}
    let consultation_check = await getConsultationByToken(prescription_data?.consultation_token)
    let user_check = await getUserByToken(prescription_data?.user_token)

    if (!!consultation_check && !!user_check) {
      let result = await addPrescription(req.body)
      res.json({
        data: result,
        success: true,
        message: "prescription ajouté avec succès!",
      })
      return
    }
    res.json({
      error: true,
      message: "Problème ! Erreur lors de l'ajout de la prescription",
    })

  } catch (error) {
    console.log(error);
    return;
  }
}).patch("/update/:token", async (req, res, next) => {
  try {
    let token = req?.params?.token
    const prescription = await getPrescriptionByToken(token);
    let consultation = await getConsultationByToken(prescription?.toJSON()?.consultation_token)

    if (!!prescription && consultation?.toJSON()?.status !== CONSULTATION_STATUS.CLOSED) {
      let updated = await updatePrescriptionByToken({
        token,
        data: req?.body
      });

      if (updated) {
        res.status(200).json({
          success: true,
          message: "Prescription Mis à jour!",
          data: updated
        });
      }

    } else {
      res.status(200).json({
        error: true,
        data: { ...req?.body, token },
        message: "Mise à jour echoué car données invalides! Consultation Cloturée!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({
      error: true,
      data: err,
      message: "Operation non aboutie! Veuillez réessayer!",
    });
  }
}).get("/:token", async (req, res) => {
  try {
    console.log(req.params);
    let antecedent = await getPrescriptionByToken(req.params?.token);
    if (antecedent) {
      return res.status(200).json({
        data: antecedent,
        success: true
      });
    } else {
      return res.status(200).json({
        data: { token: req.query?.token },
        error: true
      });
    }
  } catch (err) {
    return res.status(200).json({
      error: true,
      data: err
    });
  }
}).get("/all/consultation/:token", async (req, res) => {
  try {
    console.log(req.params);
    let consultation = await checkConsultationByToken(req?.params?.token)
    let prescriptions = await getPrescriptionsBy({ consultation_token: req?.params?.token });
    if (!consultation) {
      return res.status(200).json({
        data: prescriptions,
        success: true
      });
    } else {
      return res.status(200).json({
        data: { token: req?.params?.token },
        message: "Token Invalide",
        error: true
      });
    }
  } catch (err) {
    return res.status(200).json({
      error: true,
      data: err
    });
  }
}).get("/all/patient/:token", async (req, res) => {
  try {
    console.log(req.params);
    let prescriptions = await getPrescriptionsBy({ patient_token: req?.params?.token });
    let patient = await checkPatientByToken(req?.params?.token);

    if (!patient) {
      return res.status(200).json({
        data: prescriptions,
        success: true
      });
    } else {
      return res.status(200).json({
        data: { token: req?.params?.token },
        message: "Token Invalide",
        error: true
      });
    }
  } catch (err) {
    return res.status(200).json({
      error: true,
      data: err
    });
  }
}).post("/all/by", async (req, res) => {
  try {
    console.log(req.params);
    let prescriptions = await getPrescriptionsBy(req?.body ?? {});
    return res.status(200).json({
      data: prescriptions,
      success: true
    });
  } catch (err) {
    return res.status(200).json({
      error: true,
      data: err
    });
  }
}).delete("/delete/:token", async (req, res) => {
  let token = req.params?.token
  let examen = await getPrescriptionByToken(token)
  let consultation = await getConsultationByToken(examen?.toJSON()?.consultation_token)

  if (examen && consultation?.toJSON()?.status !== CONSULTATION_STATUS.CLOSED) {
    try {
      let _ = await deletePrescriptionByToken(token)
      if (_) {
        return res.status(200).json({
          success: true,
          message: "Examen retiré"
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(200).json({
        error: true,
        data: err,
        message: "Erreur lors de la suppression de l'examen"
      });
    }
  } else {
    return res.status(200).json({
      error: true,
      message: "Opération de suppression non autorisée"
    });
  }
})

module.exports = { PrescriptionRouter };