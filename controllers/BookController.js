const { sequelize } = require("../db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { formatFirstname } = require("../helpers/functions");

const salt = parseInt(process.env.BCRYPT_SALT);

const addBook = async ({ title, author = "", synopsis, edition, price, offsale = "0", ebook = true }) => {
  console.log("in addbook");
  return await sequelize.models.Book.create({
    token: uuidv4(),
    title,
    author,
    synopsis,
    edition,
    price,
    offsale,
    ebook
  });
};

const checkBook = async ({ title, author }) => {
  console.log("in checkbook");
  return (
    (
      await sequelize.models.Book.findAll({
        where: {
          title,
          author,
        },
      })
    ).length === 0
  );
};

const checkBookByToken = async ({ token }) => {
  console.log("in checkbook by token");
  return (
    (
      await sequelize.models.Book.findAll({
        where: {
          token: token,
        },
      })
    ).length === 0
  );
};

const getBookByToken = async (bookToken) => {
  let book = await sequelize.models.Book.findOne({
    where: {
      token: bookToken,
    },
  });
  return book;
};

const updateBookByToken = async (bookToken, data) => {
  let updated = await sequelize.models.Book.update(data, {
    where: {
      token: bookToken,
    },
  });

  console.log(updated);
  return updated.length != 0 ? updated : false;
};

const deleteBookByToken = async (bookToken, data) => {
  let deleted = await sequelize.models.Book.destroy(data, {
    where: {
      token: bookToken,
    },
  });

  console.log(deleted);
  return deleted.length != 0 ? deleted : false;
};

module.exports = {
  addBook,
  checkBook,
  checkBookByToken,
  deleteBookByToken,
  getBookByToken,
  updateBookByToken,
};
