const bookRouter = require("express").Router();
const bcrypt = require("bcrypt");
const { checkBook, addBook, getBookByToken, updateBookByToken, deleteBookByToken } = require("../controllers/BookController");

const salt = parseInt(process.env.BCRYPT_SALT);


const { addBookValidator } = require("../validators/BookValidator");

bookRouter.post("/add", addBookValidator, async (req, res, next) => {
  try {
    const check = await checkBook(req.body);

    if (check) {
      const book = await addBook(req.body);
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
    let book = await getBookByToken(req.params?.token);
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
    let book = await updateBookByToken(req.params?.token, req?.body);
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
    let book = await deleteBookByToken(req.params?.token, req?.body);
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

module.exports = { bookRouter };
