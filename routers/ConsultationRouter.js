const ConsultationRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { checkConsultationBy, addConsultation, checkConsultationByToken, closeConsultation, updateConsultationByToken, getConsultationByToken, getConsultationByUID, deleteConsultationByToken, getConsultationsBy } = require("../controllers/ConsultationController");
const { deleteDiagnosticsWhere } = require("../controllers/DiagnosticsController");
const { deletePrescriptionByToken } = require("../controllers/PrescriptionController");
const { checkPatientByToken } = require("../controllers/PatientController");
const { getUserByToken } = require("../controllers/UserController");

const { CONSULTATION_STATUS } = require("../helpers/constants");
const { addConsultationValidator } = require("../validators/ConsultationValidator");

const salt = parseInt(process.env.BCRYPT_SALT);

ConsultationRouter.post("/add", addConsultationValidator, async (req, res, next) => {
  try {

    let consultation_data = req?.body ?? {}
    let patient_check = await checkPatientByToken(consultation_data?.patient_token)
    let user_check = await getUserByToken(consultation_data?.user_token)
    if (!patient_check && !!user_check) {

      let result = await addConsultation(req.body)
      res.json({
        data: result,
        success: true,
        message: "Consultation créée avec succès!",
      })
      return
    }
    res.json({
      error: true,
      message: "Problem! Erreur lors de l'ajout de la consultation",
    })

  } catch (error) {
    console.log(error);
    return;
  }
}).patch("/close/:token", async (req, res, next) => {
  try {
    let token = req.params?.token

    const check = await getConsultationByToken(token);
    if (check && check?.toJSON()?.status != CONSULTATION_STATUS.CLOSED) {
      let cons = await closeConsultation(token);
      if (cons) {
        res.status(200).json({
          success: true,
          message: "Consultation cloturée avec succès!",
        });
      }
    } else {
      res.status(200).json({
        success: true,
        message: "Deja cloturée",
      });
    }
  } catch (err) {
    res.status(200).json({
      error: true,
      message: "Error lors de la cloture",
      data: err
    });
  }
}).patch("/update/:token", async (req, res, next) => {
  try {
    let token = req?.params?.token
    const check = await checkConsultationByToken(token);
    console.log({ "data": req?.body })
    if (!check) {
      let updated = await updateConsultationByToken({
        token,
        data: req?.body
      });

      res.status(200).json({
        success: true,
        message: "Consultation mis a jour avec succes avec succès!",
        data: updated
      });

    } else {
      res.status(200).json({
        error: true,
        data: { ...req?.body, token },
        message: "Mise à jour echoué! Veuillez réessayer!",
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
}).get("/all/user/:token", async (req, res) => {
  try {
    // console.log(req.params);
    let consultations = await getConsultationsBy({ user_token: req?.params?.token });
    if (consultations) {
      return res.status(200).json({
        data: consultations,
        success: true
      });
    } else {
      return res.status(200).json({
        data: { token: req.params?.token },
        error: true
      });
    }
  } catch (err) {
    return res.status(200).json({
      error: true,
      data: err
    });
  }
}).get("/:token", async (req, res) => {
  try {
    console.log(req.params);
    let consultation = await getConsultationByToken(req.params?.token);
    if (consultation) {
      return res.status(200).json({
        data: consultation,
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
}).post("/by", async (req, res) => {
  try {
    let consultations = await getConsultationsBy(req.body ?? {});
    if (!!consultations) {
      return res.status(200).json({
        data: consultations,
        success: true
      });
    } else {
      return res.status(200).json({
        data: req?.body,
        error: true
      });
    }
  } catch (err) {
    return res.status(200).json({
      error: true,
      data: err
    });
  }
}).get("/uid/:uid", async (req, res) => {
  try {
    let consultation = await getConsultationByUID(req.params?.uid);
    if (consultation) {
      return res.status(200).json({
        data: consultation,
        success: true
      });
    } else {
      return res.status(200).json({
        data: req.body,
        error: true
      });
    }
  } catch (err) {
    return res.status(200).json({
      error: true,
      data: err
    });
  }
}).delete("/delete/:token", async (req, res) => {
  let token = req.params?.token
  let sous = await getConsultationByToken((token))

  if (sous && sous?.toJSON()?.status !== CONSULTATION_STATUS.CLOSED) {
    try {
      let _ = await deletePrescriptionByToken({ consultation_token: token })
      _ = await deleteDiagnosticsWhere({ consultation_token: token })
      _ = await deleteDiagnosticsWhere({ consultation_token: token });
      _ = await deleteConsultationByToken(token)
      if (_.length != 0) {
        return res.status(200).json({
          success: true,
          message: "Consultation retirée"
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(200).json({
        error: true,
        data: err,
        message: "Erreur lors de la suppression de la consultation"
      });
    }
  } else {
    return res.status(200).json({
      error: true,
      message: "Episode Terminé! Opération de suppression non autorisée"
    });
  }
});

module.exports = { ConsultationRouter };
