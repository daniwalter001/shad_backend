const buyerRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { checkBook, addBook, getBookByToken, updateBookByToken, deleteBookByToken } = require("../controllers/BookController");
const { checkBuyer, addBuyer, getBuyerByToken, updateBuyerByToken, deleteBuyerByToken } = require("../controllers/BuyerController");

const salt = parseInt(process.env.BCRYPT_SALT);

const { addBuyerValidator } = require("../validators/BuyerValidator");

buyerRouter.post("/add", addBuyerValidator, async (req, res, next) => {
  try {
    const check = await checkBuyer(req.body);

    if (check) {
      const book = await addBuyer(req.body);
      res.status(200).json({
        succes: true,
        message: "Book added successfully",
        data: book,
      });
    } else {
      res.status(200).json({
        error: true,
        message: "Book already exists!",
        data: req.body,
      });
    }
  } catch (error) {
    console.log("console.log(error);");
    next(error);
  }
}).get("/:token", async (req, res, next) => {
  try {
    let book = await getBuyerByToken(req.params?.token);
    console.log(book);
    if (book) {
      return res.status(200).json({
        data: book,
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
}).patch("/:token", async (req, res, next) => {
  try {
    let book = await updateBuyerByToken(req.params?.token, req?.body);
    console.log(book);
    if (book) {
      return res.status(200).json({
        data: book,
        success: true,
        message: "Book updated!"
      });
    } else {
      return res.status(200).json({
        data: { token: req.query?.token },
        error: true,
        message: "Update failed"
      });
    }
  } catch (err) {
    return res.status(200).json({
      error: true,
      data: err
    });
    // next(err)
  }
}).delete("/:token", async (req, res, next) => {
  try {
    let book = await deleteBuyerByToken(req.params?.token, req?.body);
    console.log(book);
    if (book) {
      return res.status(200).json({
        data: book,
        success: true,
        message: "Book deleted!"
      });
    } else {
      return res.status(200).json({
        data: { token: req.query?.token },
        error: true,
        message: "Deletion failed"
      });
    }
  } catch (err) {
    return res.status(200).json({
      error: true,
      data: err
    });
    next(err)
  }
});

module.exports = { buyerRouter };
