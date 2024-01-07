const express = require("express"); //Imports Express.js framework (web app framework for Node.js)
const mongoose = require("mongoose"); //Imports Mongoose (Object Data Modeling library for MongoDB and Node.js)
const bodyParser = require("body-parser"); //middleware used to parse the body of incoming HTTP requests

require("dotenv").config();
const port = process.env.SERVER_PORT || 3000;

//========Importing the customer router========
const customerRoute = require("./route/CustomerRoute");
//====================================

const app = express(); //Creates an instance of the Express application

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());

// Connects to the mongoDB customer_crud running on localhost port 27017
// mongoose.connect method returns a promise, and then the callback is executed after the connection is extablished
mongoose.connect("mongodb://127.0.0.1:27017/customer_crud").then(() => {
  app.listen(3000, () => {
    console.log(`API started & running on port ${port}`);
  });
});

//==app.use("/") - This middleware is applied to all HTTP methods on the root path ("/")
//==("/") - Path for which the middleware is applied
//==req: incoming request, resp: outgoing request, next: function, when called, passes control to the next middleware function in the stack
// app.use("/", (req, resp, next) => {
//   resp.send("<h1>Server Works!</h1>"); //Middleware responds with a "Server Works!" message in HTML whenever a request is made to the root path
// });

app.use("/api/v1/customers", customerRoute); // http://localhost:3000/api/v1/customers/save-customer(POST)
