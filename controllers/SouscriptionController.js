const { sequelize } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const salt = parseInt(process.env.BCRYPT_SALT);


const addSouscription = async ({
  cs_token,
  souscripteur_token,
  souscription_type_token,
  activationDate
}) => {
  console.log("in addsouscripiton");
  return await sequelize.models.Souscriptions.create({
    token: uuidv4(),
    cs_token,
    souscripteur_token,
    souscription_type_token,
    status: "PENDING",
    activationDate
  });
};

const checkSouscription = async ({ cs_token, souscripteur_token }) => {
  console.log("in checksous");
  return (
    (
      await sequelize.models.Souscriptions.findAll({
        where: {
          cs_token,
          souscripteur_token
        },
      })
    ).length === 0
  );
};

const checkSouscriptionByCsToken = async ({ cs_token }) => {
  console.log("in checksous");
  return (
    (
      await sequelize.models.Souscriptions.findAll({
        where: {
          cs_token
        },
      })
    ).length === 0
  );
};

const checkSouscriptionByToken = async ({ token }) => {
  console.log("in checksous by token");
  return (
    (
      await sequelize.models.Souscriptions.findAll({
        where: {
          token: token,
        },
      })
    ).length === 0
  );
};

const validateSouscription = async ({ token }) => {
  let souscription = await getSouscriptionByToken(token);
  console.log(souscription?.toJSON())
  if (souscription) {
    if (souscription?.toJSON()?.status === "PENDING") {
      return await updateSouscriptionByToken(token, {
        status: "ACTIVE",
        activationDate: new Date().toISOString(),
      });
    } else {
      console.log("Deja valide ou undefined property");
      return false;
    }
  } else {
    console.log("pas d'souscription");
    return false;
  }
};

const blockSouscription = async ({ token }) => {
  let souscription = await getSouscriptionByToken(token);
  console.log(token);
  if (souscription) {
    if (souscription?.toJSON()?.status === "ACTIVE") {
      return await updateSouscriptionByToken(token, {
        status: 'BLOCKED',
      });
    } else {
      return false;
      console.log("deja bloqué")
    }
  } else {
    console.log("pas d'souscription");
    return false;
  }
};

const unBlockSouscription = async ({ token }) => {
  let souscription = await getSouscriptionByToken(token);
  if (souscription) {
    if (souscription?.status === "BLOCKED") {
      return await updateSouscriptionByToken(token, {
        status: "ACTIVE",
      });
    } else {
      console.log("deja actif")
      return false;
    }
  } else {
    console.log("pas d'souscription");
    return false;
  }
};

const getSouscriptionByToken = async (token) => {
  let souscription = await sequelize.models.Souscriptions.findOne({
    where: {
      token
    },
  });
  return souscription;
};

const getSouscriptionBySouscripteurToken = async (souscripteur_token) => {
  let souscription = await sequelize.models.Souscriptions.findOne({
    where: {
      souscripteur_token
    },
  });
  return souscription;
};

const updateSouscriptionByToken = async (souscription_token, data) => {
  let updated = await sequelize.models.Souscriptions.update(data, {
    where: {
      token: souscription_token,
    },
  });

  // console.log(updated);
  return updated.length != 0 ? updated : false;
};

const deleteSouscriptionByToken = async (souscripteur_token) => {
  let deleted = await sequelize.models.Souscriptions.destroy({
    where: {
      token: souscripteur_token,
    },
  });
  console.log(deleted);
  return deleted.length != 0 ? deleted : false;
};

const getSouscriptionsByStatus = async (status = "") => {
  let _ = await sequelize.models.Souscriptions.findAll({
    where: {
      status
    },
    order: [
      ["createdAt", "ASC"]
    ]
  });

  return _.map((souscription) => souscription);
};

const getSouscriptionsBy = async (data = {}) => {
  let _ = await sequelize.models.Souscriptions.findOne({
    where: data,
    order: [
      ["createdAt", "ASC"]
    ]
  });

  return _
};


module.exports = {
  addSouscription,
  blockSouscription,
  checkSouscriptionByCsToken,
  checkSouscription,
  checkSouscriptionByToken,
  deleteSouscriptionByToken,
  getSouscriptionByToken,
  getSouscriptionsByStatus,
  unBlockSouscription,
  validateSouscription,
  getSouscriptionBySouscripteurToken,
  getSouscriptionsBy
};
