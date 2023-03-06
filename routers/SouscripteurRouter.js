const souscripteurRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { getAllCs } = require("../controllers/CsController");

const { authSouscripteur, checkSouscripteur, addSouscripteur, getSouscripteurByToken, deleteSouscripteurByToken, getSouscripteurBy, updateSouscripteurByToken, getAllSouscripteurs } = require("../controllers/SouscripteurController");
const { getSouscriptionBySouscripteurToken } = require("../controllers/SouscriptionController");

const salt = parseInt(process.env.BCRYPT_SALT);

const { STATUS } = require("../helpers/constants");
const { send } = require("../helpers/mail/mailsender");
const { loginSouscripteurValidator, addSouscripteurValidator } = require("../validators/SouscripteurValidator");

souscripteurRouter.post("/login", loginSouscripteurValidator, async (req, res, next) => {
  try {
    const check = await authSouscripteur(req.body);

    if (check) {
      let { token } = check?.toJSON()

      let souscription = await getSouscriptionBySouscripteurToken(token ?? '')
      if (souscription?.toJSON()?.status == STATUS.BLOCKED) {
        res.status(200).json({
          error: true,
          message:
            "Votre compte est désactivé. Veuillez contacter l'administrateur.",
          data: check,
        });
      } else if (souscription?.toJSON()?.status == STATUS.PENDING) {
        res.status(200).json({
          error: true,
          message:
            "Votre compte est en liste d'attente. Veuillez contacter l'administrateur pour plus de details.",
          data: check,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Connexion validée",
          data: check,
        });
      }
      return;
    } else {
      res.status(200).json({
        error: true,
        message: "Email ou mot de passe incorrect",
        data: req.body,
      });
      return;
    }
  } catch (error) {
    console.log("console.log(error);");
    return;
  }
});

souscripteurRouter.post("/apply", addSouscripteurValidator, async (req, res, next) => {
  try {
    let check = await checkSouscripteur(req.body);
    if (check) {
      let sous = await addSouscripteur(req.body);
      // send(req?.body?.email, `${req?.body?.firstname + " " + req?.body?.lastname}`, req.body)

      res.status(200).json({
        data: sous,
        success: true,
        message: "Souscripteur ajouté avec succès",
      });

      return;
    } else {

      res.status(200).json({
        message: "L'adresse email est déjà associé un autre souscripteur",
        error: true
      });
      return;
    }
  } catch (error) {
    console.log(error);
    // next(error);
    return;
  }
});


souscripteurRouter.get("/all", async (req, res) => {
  try {
    let sous = await getAllSouscripteurs();
    if (sous) {
      return res.status(200).json({
        data: sous,
        success: true
      });
    } else {
      return res.status(200).json({
        data: [],
        success: true
      });
    }
  } catch (err) {
    return res.status(200).json({
      error: true,
      data: err
    });
  }
});


souscripteurRouter.get("/:token", async (req, res) => {
  try {
    console.log(req.params);
    let sous = await getSouscripteurByToken(req.params?.token);
    if (sous) {
      return res.status(200).json({
        data: sous,
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
      error: true
    });
  }
});

souscripteurRouter.delete("/delete/:token", async (req, res) => {
  try {
    let _ = await deleteSouscripteurByToken(req.params?.token);
    if (_.length != 0) {
      return res.status(200).json({
        success: true,
        message: "Souscripteur supprimé avec succès",
        data: _
      });
    }
  } catch (err) {
    return res.status(200).json({
      error: true
    });
  }
});

souscripteurRouter.patch("/change-password/:token", async (req, res) => {
  try {
    const { password, old_password, conf_password } = req.body
    if (req?.params?.token) {
      if (password === conf_password) {
        let _ = await getSouscripteurByToken(req.params?.token);
        if (_) {
          if (bcrypt.compareSync(old_password, _?.toJSON()?.password)) {
            let update = await updateSouscripteurByToken(req.params?.token, { password: bcrypt.hashSync(password, salt) })
            if (update) {
              return res.status(200).json({
                success: true,
                message: "Votre mot passe a été modifié",
              });
            }
          } else {
            return res.status(200).json({
              error: true,
              message: "Ancien mot de passe incorrect",
            });
          }

        } else {
          return res.status(200).json({
            error: true,
            message: "Requête invalide. Aucun compte n'est associé à ces informations",
          });
        }
      } else {
        return res.status(200).json({
          error: true,
          message: "Les mots de passes ne correspondent pas",
        });
      }
    } else {
      return res.status(200).json({
        error: true,
        message: "Données Invalides",
      });
    }

  } catch (err) {
    return res.status(200).json({
      error: true
    });
  }
});

module.exports = { souscripteurRouter };
