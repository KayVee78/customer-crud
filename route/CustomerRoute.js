const express = require("express"); //Imports Express.js framework
const CustomerController = require("../controller/CustomerController"); //Imports CustomerController module, that handles the logic of customer CRUD
const verifyToken = require("../middleware/AuthMiddleware")

const router = express.Router(); //Created an instance of an Express router

router.post("/save-customer", verifyToken,CustomerController.saveCustomer);
router.put("/update-customer", verifyToken,CustomerController.updateCustomer);
router.delete("/delete-customer", verifyToken,CustomerController.deleteCustomer);
router.get("/get-customer", verifyToken,CustomerController.findCustomer);
router.get("/get-all-customers", verifyToken,CustomerController.findAllCustomers);

module.exports = router;
