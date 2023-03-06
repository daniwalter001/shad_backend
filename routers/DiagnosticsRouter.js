const DiagnosticsRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { getConsultationByToken, checkConsultationByToken } = require("../controllers/ConsultationController");
const { addDiagnostics, checkDiagnosticsByToken, updateDiagnosticsByToken, getDiagnosticsBy, getDiagnosticsByToken, deleteDiagnosticsByToken } = require("../controllers/DiagnosticsController");
const { getUserByToken } = require("../controllers/UserController");
const { CONSULTATION_STATUS } = require("../helpers/constants");
const { addDiagnosticsValidator } = require("../validators/DiagnosticsValidator");

const salt = parseInt(process.env.BCRYPT_SALT);

DiagnosticsRouter.post("/add", addDiagnosticsValidator, async (req, res, next) => {
  try {

    let d_data = req?.body ?? {}
    let consultation_check = await getConsultationByToken(d_data?.consultation_token)
    let user_check = await getUserByToken(d_data?.user_token)

    if (!!consultation_check && !!user_check) {
      let result = await addDiagnostics(req.body)
      res.json({
        data: result,
        success: true,
        message: "Diagnostic ajouté avec succès!",
      })
      return
    }
    res.json({
      error: true,
      message: "Problem! Erreur lors de l'ajout du diagnostic",
    })

  } catch (error) {
    console.log(error);
    return;
  }
}).patch("/update/:token", async (req, res, next) => {
  try {
    let token = req?.params?.token
    const check = await checkDiagnosticsByToken(token);

    if (!check) {
      let updated = await updateDiagnosticsByToken(token ?? "")
      if (updated) {
        res.status(200).json({
          success: true,
          message: "Diagnostic Mis à jour!",
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
    let antecedent = await getDiagnosticsByToken(req.params?.token);
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
    let diagnostics = await getDiagnosticsBy({ consultation_token: req?.params?.token });
    if (!consultation) {
      return res.status(200).json({
        data: diagnostics,
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
    let diagnostics = await getDiagnosticsBy({ patient_token: req?.params?.token });
    let patient = await checkPatientByToken(req?.params?.token);

    if (!patient) {
      return res.status(200).json({
        data: diagnostics,
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
    let diagnostics = await getDiagnosticsBy(req?.body ?? {});
    return res.status(200).json({
      data: diagnostics,
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
  let diagnostic = await getDiagnosticsByToken(token)
  let consultation = await getConsultationByToken(diagnostic?.toJSON()?.consultation_token)

  if (diagnostic && consultation?.toJSON()?.status !== CONSULTATION_STATUS.CLOSED) {
    try {
      let _ = await deleteDiagnosticsByToken(token)
      if (_.length != 0) {
        return res.status(200).json({
          success: true,
          message: "Diagnostic retiré"
        });
      }
    } catch (err) {
      console.log(err)
      return res.status(200).json({
        error: true,
        data: err,
        message: "Erreur lors de la suppression du diagnostic"
      });
    }
  } else {
    return res.status(200).json({
      error: true,
      message: "Opération de suppression non autorisée"
    });
  }
})

module.exports = { DiagnosticsRouter };