const ExamenRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { addExamenValidator } = require("../validators/ExamenValidator");
const { addExamen, checkExamenByToken, updateExamenByToken, getExamenByToken, deleteExamenByToken, getExamenBy } = require("../controllers/ExamenController");
const { getConsultationByToken, checkConsultationByToken } = require("../controllers/ConsultationController");
const { checkPatientByToken } = require("../controllers/PatientController");
const { getUserByToken } = require("../controllers/UserController");
const { CONSULTATION_STATUS } = require("../helpers/constants");

const salt = parseInt(process.env.BCRYPT_SALT);

ExamenRouter.post("/add", addExamenValidator, async (req, res, next) => {
  try {

    let examen_data = req?.body ?? {}
    let consultation_check = await getConsultationByToken(examen_data?.consultation_token)
    let user_check = await getUserByToken(examen_data?.user_token)

    if (!!consultation_check && !!user_check) {
      let result = await addExamen(req.body)
      res.json({
        data: result,
        success: true,
        message: "Examen ajouté avec succès!",
      })
      return
    }
    res.json({
      error: true,
      message: "Problem! Erreur lors de l'ajout de l'examen",
    })

  } catch (error) {
    console.log(error);
    return;
  }
}).patch("/update/:token", async (req, res, next) => {
  try {
    let token = req?.params?.token
    const check = await checkExamenByToken(token);

    if (!check) {
      let updated = await updateExamenByToken({
        token,
        data: req?.body
      });

      if (updated) {
        res.status(200).json({
          success: true,
          message: "Ex. Mis à jour!",
          data: updated
        });
      }

    } else {
      res.status(200).json({
        error: true,
        data: { ...req?.body, token },
        message: "Mise à jour echoué car données invalides! Veuillez réessayer!",
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
    let antecedent = await getExamenByToken(req.params?.token);
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
    let examens = await getExamenBy({ consultation_token: req?.params?.token });
    let consultation = await checkConsultationByToken(req?.params?.token)
    if (!consultation) {
      return res.status(200).json({
        data: examens,
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
    let examens = await getExamenBy({ patient_token: req?.params?.token });
    let patient = await checkPatientByToken(req?.params?.token);

    if (!patient) {
      return res.status(200).json({
        data: examens,
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
    let antecedents = await getExamenBy(req?.body ?? {});
    return res.status(200).json({
      data: antecedents,
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
  let examen = await getExamenByToken(token)
  let consultation = await getConsultationByToken(examen?.toJSON()?.consultation_token)

  if (examen && consultation?.toJSON()?.status !== CONSULTATION_STATUS.CLOSED) {
    try {
      let _ = await deleteExamenByToken(token)
      if (_.length != 0) {
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

module.exports = { ExamenRouter };