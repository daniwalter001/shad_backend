const { sequelize } = require("../db.js");

const { defineUserModel } = require("./UserModel");
const { defineAdminModel } = require("./AdminModel");
const { definePatientModel } = require("./PatientModel");
const { defineTypeSouscripteurModel } = require("./TypeSouscriptionModel.js");
const { defineSouscripteurModel } = require("./SouscripteurModel.js");
const { defineSouscriptionModel } = require("./SouscriptionModel.js");
const { defineCsModel } = require("./CsModel.js");
const { defineConsultationModel } = require("./ConsultationModel.js");
const { defineAntecedentModel } = require("./AntecedentModel.js");
const { defineDiagnosticModel } = require("./DiagnosticsModel.js");
const { definePrescriptionModel } = require("./PrescriptionModel");
const { defineExamenModel } = require("./ExamenModel");

const { send } = require("../helpers/mail/mailsender");

const { checkAdmin, addAdmin } = require("../controllers/AdminController.js");
const { addSouscriptionType, checkSouscriptionType } = require("../controllers/SouscriptionTypeController.js");
const { defineSharedFileModel } = require("./SharedFileModel.js");

const initModels = () => {

  //creation des models

  defineUserModel(sequelize);
  defineAdminModel(sequelize);
  definePatientModel(sequelize);
  defineSouscripteurModel(sequelize)
  defineSouscriptionModel(sequelize)
  defineCsModel(sequelize)
  defineTypeSouscripteurModel(sequelize)
  defineConsultationModel(sequelize)
  defineAntecedentModel(sequelize)
  defineDiagnosticModel(sequelize)
  definePrescriptionModel(sequelize)
  defineExamenModel(sequelize)
  defineSharedFileModel(sequelize)

  //synchronisation des models
  sequelize
    .sync({ alter: true })
    // .sync({ force: true })
    .then(async () => {
      console.log("sync successfull");
      console.log("Adding some initial data")
      const admin = {
        "lastname": "root",
        "firstname": "root",
        "email": "root@gmail.com",
        "phone": "0022899101010",
        "password": "rootroot",
      }
      const t_sous_1 = {
        type: "BASIC",
        sub_account_number: "10",
      }
      const t_sous_2 = {
        type: "MOYEN",
        sub_account_number: "100",
      }
      const t_sous_3 = {
        type: "ULTRA",
        sub_account_number: "500",
      }

      const SOUS_TYPE = [
        {
          type: "BASIC",
          sub_account_number: "10",
        },
        {
          type: "MOYEN",
          sub_account_number: "100",
        },
        {
          type: "ULTRA",
          sub_account_number: "500",
        }
      ]

      let _ = await checkAdmin(admin) && await addAdmin(admin)

      SOUS_TYPE.forEach(async entry => {
        let __ = await checkSouscriptionType(entry) && await addSouscriptionType(entry)
      })
      console.log("Initial data added...")
    })
    .catch((err) => {
      console.log(err);
      console.log("sync failed");
    });
};

module.exports = { initModels };
