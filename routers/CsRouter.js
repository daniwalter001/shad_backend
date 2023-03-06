const csRouter = require("express").Router();
const bcrypt = require("bcrypt");
const multer = require("multer");

const salt = parseInt(process.env.BCRYPT_SALT);


const { send } = require("../helpers/mail/mailsender");

const { addCsValidator } = require("../validators/CsValidator");
const {
  checkCs,
  addCs,
  getCsByToken,
  deleteCsByToken,
  updateCsByToken,
  checkCsByToken,
  getCsByEmail,
  getAllCs,
} = require("../controllers/CsController");
const { paths } = require("../helpers/constants");
const { checkSouscriptionByCsToken } = require("../controllers/SouscriptionController");

// HANDLING UPLOAD LOGO GOES HERE ---------------

let date = new Date();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, paths.CS_LOGOS);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${req.body?.token
      }-${date.getTime()}-${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    req.uniqueSuffixe = uniqueSuffix;
    const ext = file.mimetype.split("/")[1]
    // req?.body?.ext = ext

    cb(null, `${uniqueSuffix}.${ext}`);
  },
});
const upload = multer({ storage: storage });


// HANDLING UPLOAD AUTHORISATION FILES GO HERE GOES HERE ---------------

const storage_authorisation = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, paths.CS_AUTHORIZATIONS);
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1]
    // req?.bod
    cb(null, `${req?.body?.authorisation_file_slug}.${ext}`);
  },
});
const upload_authorisation = multer({ storage: storage_authorisation });

// ------------------------------------------------

csRouter.post("/add", upload_authorisation.single("authorisation_file"), async (req, res, next) => {
  try {
    let check = await getCsByEmail(req.body?.email)
    if (!check) {
      let cs = await addCs({
        ...req.body,
        authorisation_file_link: `${req?.file?.path}`
      });
      res.status(200).json({
        data: cs,
        succes: true,
        message: "Hopital ajouté avec succès effectuée avec succès",
      })
      return;
    } else {
      let check_souscription_by_cs = await checkSouscriptionByCsToken({ cs_token: check?.toJSON()?.token })

      if (check_souscription_by_cs) {
        res.status(200).json({
          data: check?.toJSON(),
          succes: true,
          message: "Reprise de la souscription pour cet hopital",
        })
      } else {
        res.status(200).json({
          message: "Cet hopital existe deja avec une souscription en son nom",
          error: true,
        });

      }
      return;
    }
  } catch (error) {
    console.log(error);
    // next(error);
    return;
  }
});

csRouter.post("/add/logo", async (req, res, next) => {
  console.log(req.body)
});


csRouter.get("/all", async (req, res) => {
  try {
    let cs = await getAllCs();
    if (cs) {
      return res.status(200).json({
        data: cs,
        success: true,
      });
    } else {
      return res.status(200).json({
        data: [],
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


csRouter.get("/:token", async (req, res) => {
  try {
    console.log(req.params);
    let cs = await getCsByToken(req.params?.token);
    if (cs) {
      return res.status(200).json({
        data: cs,
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

csRouter.delete("/delete/:token", async (req, res) => {
  try {
    let _ = await deleteCsByToken(req.params?.token);
    if (_.length != 0) {
      return res.status(200).json({
        success: true,
        data: _
      });
    }
  } catch (err) {
    return res.status(200).json({
      message: "deletion failed",
      error: true
    });
  }
});

csRouter.patch("/update", async (req, res) => {
  try {
    let _ = await updateCsByToken(req.body?.token, req.body);
    if (_.length != 0) {
      return res.status(200).json({
        success: true,
        data: _,
      });
    }
  } catch (err) {
    return res.status(200).json({
      message: "update failed",
      error: true
    });
  }
});

csRouter.patch("/update/logo", upload?.single("cs-logo"), async (req, res) => {
  try {
    let check_cs = checkCsByToken(req?.body?.token);

    if (!check_cs) {
      console.log(req)
      let _ = await updateCsByToken(req.body?.token, {
        logo: req.uniqueSuffix,
      });
      return res.status(200).json({
        success: true,
        data: _,
      });
    } else {
      return res.status(200).json({
        error: true,
        message: "Cs dont exist",
      });
    }
  } catch (err) {
    return res.status(200).json({
      message: "update failed",
      error: true
    });
  }
});

module.exports = { csRouter };
