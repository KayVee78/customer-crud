const express = require("express"); //Imports Express.js framework
const CustomerController = require("../controller/UserController"); //Imports UserController module, that handles the logic of customer CRUD

const router = express.Router(); //Created an instance of an Express router

router.post("/signup", CustomerController.signup);
router.post("/login", CustomerController.login);

module.exports = router;
