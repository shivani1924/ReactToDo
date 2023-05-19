const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwtKey = "f-t";
const cookieParser = require("cookie-parser");

const db = require("../db/dbConnection")


  app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use("/login",login);
// app.use("/signup",signup);
 
 
 const signup = async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const sqlInsert =
      "INSERT INTO users (firstName, lastName, email, password) VALUES (?,?,?,?)";
    db.query(sqlInsert, [firstName, lastName, email, password], (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      const sqlFind = " SELECT * From users  where email = ? AND  password = ?";
      db.query(sqlFind, [email, password], (err, result) => {
        if (err) {
          res.send({ err: err });
        }
        if (result.length > 0) {
          jwt.sign({ result }, jwtKey, { expiresIn: "1h" }, (err, token) => {
            res.send({ result, auth: token });
          });
        }
      });
    });
  };
  
  const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const sqlInsert = " SELECT * From users  where email = ? AND  password = ?";
    db.query(sqlInsert, [email, password], (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        jwt.sign(
          { id: result.idusers },
          jwtKey,
          { expiresIn: "1h" },
          (err, token) => {
            if (token) {
              res.send({ result, auth: token });
            }
          }
        );
      } else {
        res.send({ message: "Wrong username password" });
      }
    });
  };

  module.exports = { signup,login };