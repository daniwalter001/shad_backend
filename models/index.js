const { sequelize } = require("../db.js");

const { defineAdminModel } = require("./AdminModel");
const { defineBookModel } = require("./BookModel");
const { defineBuyerModel } = require("./BuyerModel");

const { send } = require("../helpers/mail/mailsender");
const { checkAdmin, addAdmin } = require("../controllers/AdminController.js");

const initModels = () => {

  //creation des models

  defineAdminModel(sequelize);
  defineBookModel(sequelize);
  defineBuyerModel(sequelize);


  //synchronisation des models
  sequelize
    .sync({ alter: true })
    // .sync({ force: true })
    .then(async () => {
      console.log("sync successfull");
      console.log("Adding some initial data")
      const admin = {
        "name": "root",
        "email": "root@gmail.com",
        "phone": "0022899101010",
        "password": "rootroot",
      }

      let _ = await checkAdmin(admin) && await addAdmin(admin)

      console.log("Initial data added...")
    })
    .catch((err) => {
      console.log(err);
      console.log("sync failed");
    });
};

module.exports = { initModels };
