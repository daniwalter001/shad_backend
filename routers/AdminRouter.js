const adminRouter = require("express").Router();
const bcrypt = require("bcrypt");

const salt = parseInt(process.env.BCRYPT_SALT);

const {
  authAdmin,
  getAdminByToken,
} = require("../controllers/AdminController");
const {
  adminLoginValidator,
} = require("../validators/AdminValidator");

adminRouter.post("/login", adminLoginValidator, async (req, res, next) => {
  try {
    const check = await authAdmin(req.body);

    if (check) {
      res.status(200).json({
        succes: true,
        message: "Connexion validée",
        data: check,
      });
    } else {
      res.status(200).json({
        error: true,
        message: "Email ou mot de passe incorrect",
        data: req.body,
      });
    }
  } catch (error) {
    console.log("console.log(error);");
    next(error);
  }
});

adminRouter.get("/:token", async (req, res) => {
  try {
    let user = await getAdminByToken(req.params?.token);
    console.log(user);
    if (user) {
      return res.status(200).json({
        data: user,
        success: true,
      });
    } else {
      return res.status(200).json({
        data: { token: req.query?.token },
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

module.exports = { adminRouter };
