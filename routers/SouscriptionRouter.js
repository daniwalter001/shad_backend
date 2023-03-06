const souscriptionRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { checkCsByToken, deleteCsByToken, getCsByToken } = require("../controllers/CsController");
const { checkSouscripteurByToken, deleteSouscripteurByToken, getSouscripteurByToken } = require("../controllers/SouscripteurController");
const { addSouscription, checkSouscriptionByToken, validateSouscription, blockSouscription, getSouscriptionByToken, deleteSouscriptionByToken, checkSouscriptionByCsToken, unBlockSouscription, getSouscriptionsByStatus, getSouscriptionsBy } = require("../controllers/SouscriptionController");
const { getSouscriptionTypes, getSouscriptionTypeByToken } = require("../controllers/SouscriptionTypeController");
const { STATUS } = require("../helpers/constants");

const salt = parseInt(process.env.BCRYPT_SALT);


const { send } = require("../helpers/mail/mailsender");

const { addSouscriptionValidator } = require("../validators/SouscriptionValidator");

souscriptionRouter.post("/add", addSouscriptionValidator, async (req, res, next) => {
  try {

    let souscription_check = await checkSouscriptionByCsToken({ cs_token: req.body?.cs_token })

    let cs = await getCsByToken(req.body?.cs_token)
    let souscripteur = await getSouscripteurByToken(req.body?.souscripteur_token)
    let souscription_type = await getSouscriptionTypeByToken(req?.body?.souscription_type_token)

    if (souscription_check && cs && souscripteur) { // souscription_check = true means the it does not exist

      let result = await addSouscription(req.body)

      if (result) {
        send(souscripteur?.toJSON()?.email ?? '', { souscripteur: souscripteur?.toJSON() ?? {}, souscription_type: souscription_type?.toJSON() ?? {}, cs: cs?.toJSON() ?? {} })
      }
      res.json({
        data: result,
        success: true,
        message: "Souscription ajoutée avec succès!",
      })
      return
    }
    res.json({
      error: true,
      message: "Problem!",
    })

  } catch (error) {
    console.log(error);
    return;
  }
});

souscriptionRouter.patch("/validate/", async (req, res, next) => {
  try {
    const check = await getSouscriptionByToken(req.body?.token);

    let cs = await getCsByToken(check?.toJSON()?.cs_token)
    let souscripteur = await getSouscripteurByToken(check?.toJSON()?.souscripteur_token)
    let souscription_type = await getSouscriptionTypeByToken(check?.toJSON()?.souscription_type_token)

    if (check) {
      let valid = await validateSouscription(req.body);

      if (valid) {
        send(souscripteur?.toJSON()?.email ?? '', { souscripteur: souscripteur?.toJSON() ?? {}, souscription_type: souscription_type?.toJSON() ?? {}, cs: cs?.toJSON() ?? {} }, 'VALIDATION_SOUSCRIPTION')
      }

      console.log(valid);
      if (valid) {
        res.status(200).json({
          success: true,
          message: "Souscription validé avec succès!",
          // data: valid
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Souscription déjà validé!",
        });
      }
    } else {
      res.status(200).json({
        error: true,
        message: "Operation non aboutie! Veuillez réessayer!",
      });
    }
  } catch (error) {
    console.log("console.log(error);");
    // next(error);
  }
});

souscriptionRouter.patch("/block/", async (req, res, next) => {
  try {
    const check = await checkSouscriptionByToken(req.body);

    if (!check) {
      let blocked = await blockSouscription(req.body);
      console.log(blocked);
      if (blocked) {
        res.status(200).json({
          success: true,
          message: "Souscription bloqué avec succès!",
          data: blocked
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Souscription déjà bloqué!",
        });
      }
    } else {
      res.status(200).json({
        error: true,
        message: "Operation non aboutie! Veuillez réessayer!",
      });
    }
  } catch (error) {
    console.log(error);
    // next(error);
  }
});


souscriptionRouter.patch("/unblock/", async (req, res, next) => {
  try {
    const check = await checkSouscriptionByToken(req.body);

    if (!check) {
      let enabled = await unBlockSouscription(req.body);
      console.log(enabled);
      if (enabled) {
        res.status(200).json({
          success: true,
          message: "Souscription debloqué avec succès!",
          data: enabled
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Souscription déjà actif!",
        });
      }
    } else {
      res.status(200).json({
        error: true,
        message: "Operation non aboutie! Veuillez réessayer!",
      });
    }
  } catch (error) {
    console.log(error)
    // next(error);
  }
});

souscriptionRouter.post("/:token", async (req, res) => {
  try {
    console.log(req.params);
    let sous = await getSouscriptionByToken(req.params?.token);
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
      error: true,
      data: err
    });
  }
});
souscriptionRouter.post("/", async (req, res) => {
  try {
    let sous = await getSouscriptionsBy(req.body ?? {});
    if (sous) {
      return res.status(200).json({
        data: sous,
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
});

souscriptionRouter.get("/types/", async (req, res) => {
  try {
    let sous = await getSouscriptionTypes()
    if (sous) {
      console.log(sous)
      return res.status(200).json({
        data: sous,
        success: true
      });
    } else {
      return res.status(200).json({
        message: "Aucun type de souscription disponible",
        error: true
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(200).json({
      error: true,
      data: err
    });
  }
});

souscriptionRouter.get("/type/:token", async (req, res) => {
  try {
    let sous_type = await getSouscriptionTypeByToken(req?.params?.token)
    if (sous_type) {
      console.log(sous_type)
      return res.status(200).json({
        data: sous_type,
        success: true
      });
    } else {
      return res.status(200).json({
        message: "Aucun type de souscription disponible",
        error: true
      });
    }
  } catch (err) {
    console.log(err)
    return res.status(200).json({
      error: true,
      data: err
    });
  }
});


souscriptionRouter.get("/pending/list", async (req, res) => {
  try {
    let sous = await getSouscriptionsByStatus(STATUS.PENDING);
    if (sous) {
      return res.status(200).json({
        success: true,
        data: sous
      });
    }
  } catch (err) {
    console.log({ err })
    return res.status(200).json({
      error: true,
      data: err
    });
  }
});

souscriptionRouter.get("/blocked/list", async (req, res) => {
  try {
    let sous = await getSouscriptionsByStatus(STATUS.BLOCKED);
    if (sous) {
      return res.status(200).json({
        success: true,
        data: sous
      });
    }
  } catch (err) {
    return res.status(200).json({
      error: true,
      data: err
    });
  }
});

souscriptionRouter.get("/active/list", async (req, res) => {
  try {
    let sous = await getSouscriptionsByStatus(STATUS.ACTIVE);
    if (sous) {
      return res.status(200).json({
        success: true,
        data: sous
      });
    } else {
      console.log(sous)
    }
  } catch (err) {
    return res.status(200).json({
      error: true,
      data: err
    });
  }
});

souscriptionRouter.delete("/delete/:token", async (req, res) => {
  let token = req.params?.token
  let sous = await getSouscriptionByToken((token))
  if (sous) {
    try {
      let _ = await deleteCsByToken(sous?.toJSON()?.cs_token)
      _ = await deleteSouscripteurByToken(sous?.toJSON()?.souscripteur_token)
      _ = await deleteSouscriptionByToken(token);
      if (_.length != 0) {
        return res.status(200).json({
          success: true,
        });
      }
    } catch (err) {
      return res.status(200).json({
        error: true,
        data: err
      });
    }
  }
});



module.exports = { souscriptionRouter };
