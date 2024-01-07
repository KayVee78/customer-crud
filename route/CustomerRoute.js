const express = require("express"); //Imports Express.js framework
const CustomerController = require("../controller/CustomerController"); //Imports CustomerController module, that handles the logic of customer CRUD

const router = express.Router(); //Created an instance of an Express router

router.post("/save-customer", CustomerController.saveCustomer);
router.put("/update-customer", CustomerController.updateCustomer);
router.delete("/delete-customer", CustomerController.deleteCustomer);
router.get("/get-customer", CustomerController.findCustomer);
router.get("/get-all-customers", CustomerController.findAllCustomers);

module.exports = router;
