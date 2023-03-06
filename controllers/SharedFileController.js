const { sequelize } = require("../db");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
// const salt = parseInt(process.env.BCRYPT_SALT);

const addSharedFile = async ({
  sender,
  receiver,
  description,
  filename,
}) => {
  console.log("in add SharedFile");
  return await sequelize.models.SharedFiles.create({
    token: uuidv4(),
    sender,
    receiver,
    description,
    filename,
    visible: true
  });
};

const getSharedFileByToken = async (token) => {
  let user = await sequelize.models.SharedFiles.findOne({
    where: {
      token,
    },
  });
  return user;
};

const updateSharedFileByToken = async ({ token, data }) => {
  let updated = await sequelize.models.SharedFiles.update(data, {
    where: {
      token
    },
  });

  console.log(updated);
  return updated.length != 0 ? updated : false;
};

const deleteSharedFileByToken = async (token) => {
  let deleted = await sequelize.models.SharedFiles.destroy({
    where: {
      token
    },
  });
  console.log(deleted);
  return deleted.length != 0 ? deleted : false;
};

const deleteSharedFileWhere = async (data = {}) => {
  let deleted = await sequelize.models.SharedFiles.destroy({
    where: data,
  });
  console.log(deleted);
  return deleted.length != 0 ? deleted : false;
};

const getSharedFilesBySenderToken = async (sender) => {
  console.log("in get SharedFile by consultation ");
  let _ = await sequelize.models.SharedFiles.findAll({
    where: {
      sender,
    },
    order: [
      ['createdAt', "DESC"]
    ]
  });

  return _;
};

const getSharedFilesBySenderOrReceiverToken = async (token) => {
  console.log("in get SharedFile by rec and send token ");
  let _ = await sequelize.models.SharedFiles.findAll({
    where: {
      [Op.or]: [
        {
          receiver: token
        },
        {
          sender: token
        }
      ]
    },
    order: [
      ['createdAt', "DESC"]
    ]
  });
  return _
};

const getSharedFilesByReceiverToken = async (receiver) => {
  console.log("in get SharedFile by consultation ");
  let _ = await sequelize.models.SharedFiles.findAll({
    where: {
      receiver
    },
    order: [
      ['createdAt', "DESC"]
    ]
  });

  return _;
};


const getSharedFilesBy = async (data = {}) => {
  console.log("in get SharedFiles by ");
  let _ = await sequelize.models.SharedFiles.findAll({
    where: data,
  });

  return _;
};

module.exports = {
  addSharedFile,
  deleteSharedFileByToken,
  deleteSharedFileWhere,
  getSharedFileByToken,
  getSharedFilesBy,
  getSharedFilesByReceiverToken,
  updateSharedFileByToken,
  getSharedFilesBySenderOrReceiverToken,
  getSharedFilesBySenderToken
};
