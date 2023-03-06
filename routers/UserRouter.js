const userRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { getCsByToken } = require("../controllers/CsController");

const salt = parseInt(process.env.BCRYPT_SALT);

const {
  addUser,
  checkUser,
  authUser,
  getUserByToken,
  deleteUserByToken,
  getUsersBySouscripteurToken,
} = require("../controllers/UserController");
const { send } = require("../helpers/mail/mailsender");

const {
  loginValidator,
  registrationValidator,
} = require("../validators/UserValidator");

userRouter.post("/login", loginValidator, async (req, res, next) => {
  try {
    const check = await authUser(req.body);
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
        user: req.body,
      });
      return;
    }
  } catch (error) {
    console.log(err);
    res.status(200).json({
      error: true,
      message: "Operation non aboutie",
      user: req.body,
    });
    return;
  }
});

userRouter.post("/add", registrationValidator, async (req, res, next) => {
  // console.log(req?.body)
  try {
    let check = await checkUser(req.body);
    if (check) {
      let cs = await getCsByToken(req?.body?.cs_token)
      let user = await addUser(req.body);
      // console.log({ user })
      // console.log(req.body);
      // send(req?.body?.email, `${req?.body?.firstname + " " + req?.body?.lastname}`, req.body)

      if (user) {
        send(req?.body?.email ?? '', { cs: cs?.toJSON(), user: req?.body }, 'AJOUT_PRATICIEN')
      }

      res.status(200).json({
        data: user,
        success: true,
        message: "Praticien ajouté avec succès",
      });
      return;
    } else {
      res.status(200).json({
        message: "L'adresse email est déjà associé un praticien",
        error: true,
      });
      return;
    }
  } catch (error) {
    console.log(error);
    // next(error);
    return;
  }
});


userRouter.get("/:token", async (req, res) => {
  try {
    console.log(req.params);
    let user = await getUserByToken(req.params?.token);
    if (user) {
      return res.status(200).json({
        data: user,
        success: true,
      });
    } else {
      return res.status(200).json({
        token: req.query?.token,
        error: true,
      });
    }
  } catch (err) {
    return res.status(200).json({
      error: true,
      data: err
    });
  }
});

userRouter.delete("/delete/:token", async (req, res) => {
  try {
    let _ = await deleteUserByToken(req.params?.token);
    if (_.length != 0) {
      return res.status(200).json({
        success: true,
        message: "Praticien supprimé avec succes"
      });
    }
  } catch (err) {
    return res.status(200).json({
      error: true,
      message: "Operation non aboutie",
      data: err
    });
  }
});



userRouter.get("/souscripteur/:token", async (req, res) => {
  try {
    console.log(req.params);
    let users = await getUsersBySouscripteurToken(req.params?.token);
    if (users) {
      return res.status(200).json({
        data: users,
        success: true,
      });
    } else {
      return res.status(200).json({
        data: { token: req.query?.token },
        error: true,
        message: "Aucun praticien associé à ce santre de santé"
      });
    }
  } catch (err) {
    return res.status(200).json({
      error: true,
      data: err,
      message: "Opération non aboutie"
    });
  }
});


module.exports = { userRouter };
