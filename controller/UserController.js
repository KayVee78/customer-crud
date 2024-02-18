const UserSchema = require("../model/UserSchema");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");

const signup = async (req, resp) => {
  UserSchema.findOne({ email: req.body.email })
    .then((result) => {
      if (result == null) {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
          if (err) {
            return resp.status(500).json({ message: "Something went wrong" });
          }
          // Store hash in your password DB.
          const user = new UserSchema({
            username: req.body.username,
            fullName: req.body.fullName,
            password: hash,
          });
          user
            .save()
            .then((saveData) => {
              resp.status(201).json({ message: "User saved successfully!" });
            })
            .catch((error) => {
              resp.status(500).json(error);
            });
        });
        // add new record
        //1 -> password
        //2 -> save
      } else {
        resp.status(409).json({ message: "Username already exists!" });
      }
    })
    .catch((error) => {
      resp.status(500).json(error); //handle unexpected errors
    });
};

const login = async (req, resp) => {
  UserSchema.findOne({ email: req.body.email })
    .then((selectedUser) => {
      if (selectedUser == null) {
        return resp.status(404).json({ message: "Username not found!" });
      } else {
        bcrypt.compare(
          req.body.password,
          selectedUser.password,
          function (err, result) {
            if (err) {
              return resp.status(500).json(err);
            }

            if (result) {
              //jwt token
              const expiresIn = 3600;
              const token = jsonWebToken.sign(
                { username: selectedUser.username },
                process.env.SECRET_KEY,
                { expiresIn }
              );
              resp.setHeader("Authorization", `Bearer ${token}`);
              return resp.status(200).json({ message: "Check Headers" });
            } else {
              return resp
                .status(401)
                .json({ message: "Password is incorrect!" });
            }
          }
        );
      }
    })
    .catch((error) => {
      resp.status(500).json(error); //handle unexpected errors
    });
};

module.exports = {
  signup,
  login,
};
