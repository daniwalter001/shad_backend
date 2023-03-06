const AntecedentRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { addAntecedent, checkAntecedentByToken, updateAntecedentByToken, getAntecedentByToken, deleteAntecedentByToken, getAllAntecedents, getAntecedentsBy } = require("../controllers/AntecedentController");
const { getConsultationByToken, checkConsultationByToken } = require("../controllers/ConsultationController");
const { checkPatientByToken } = require("../controllers/PatientController");
const { getUserByToken } = require("../controllers/UserController");
const { CONSULTATION_STATUS } = require("../helpers/constants");
const { addAntecedentValidator } = require("../validators/AntecedentValidator");

const salt = parseInt(process.env.BCRYPT_SALT);

AntecedentRouter.post("/add", addAntecedentValidator, async (req, res, next) => {
  try {

    let antecedent_data = req?.body ?? {}
    let consultation_check = await getConsultationByToken(antecedent_data?.consultation_token)
    let user_check = await getUserByToken(antecedent_data?.user_token)

    if (!!consultation_check && !!user_check) {
      let result = await addAntecedent(req.body)
      res.json({
        data: result,
        success: true,
        message: "Antecedent créé avec succès!",
      })
      return
    }
    res.json({
      error: true,
      message: "Problem! Erreur lors de l'ajout de la antecedent",
    })

  } catch (error) {
    console.log(error);
    return;
  }
}).patch("/update/:token", async (req, res, next) => {
  try {
    let token = req?.params?.token
    const check = await checkAntecedentByToken(token);

    if (!check) {
      let updated = await updateAntecedentByToken({
        token,
        data: req?.body
      });

      if (updated) {
        res.status(200).json({
          success: true,
          message: "Mis à jour!",
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
    let antecedent = await getAntecedentByToken(req.params?.token);
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
}).get("/all/", async (req, res) => {
  try {
    console.log(req.params);
    let antecedent = await getAllAntecedents();
    if (!!antecedent) {
      return res.status(200).json({
        data: antecedent,
        success: true
      });
    } else {
      return res.status(200).json({
        data: "",
        message: "Error",
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
    let consultation = await checkConsultationByToken(req?.params?.token);
    let antecedents = await getAntecedentsBy({ consultation_token: req?.params?.token });
    if (!consultation) {
      return res.status(200).json({
        data: antecedents,
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
    let antecedents = await getAntecedentsBy({ patient_token: req?.params?.token });
    let patient = await checkPatientByToken(req?.params?.token);

    if (!patient) {
      return res.status(200).json({
        data: antecedents,
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
    let antecedents = await getAntecedentsBy(req?.body ?? {});
    if (!!antecedents) {
      return res.status(200).json({
        data: antecedents,
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
}).delete("/delete/:token", async (req, res) => {
  let token = req.params?.token
  let antecedent = await getAntecedentByToken(token)
  let consultation = await getConsultationByToken(antecedent?.toJSON()?.consultation_token)

  if (antecedent && consultation?.toJSON()?.status !== CONSULTATION_STATUS.CLOSED) {
    try {
      let _ = await deleteAntecedentByToken(token)
      if (_.length != 0) {
        return res.status(200).json({
          success: true,
          message: "Antecedent retiré"
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(200).json({
        error: true,
        data: err,
        message: "Erreur lors de la suppression de l antecedent"
      });
    }
  } else {
    return res.status(200).json({
      error: true,
      message: "Opération de suppression non autorisée"
    });
  }
})

module.exports = { AntecedentRouter };