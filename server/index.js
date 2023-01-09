const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const mysql = require("mysql");
const cors = require("cors");
// const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const jwtKey = 'f-t';




const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "firsttouch",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

app.post("/signup", (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password
    const sqlInsert = "INSERT INTO users (firstName, lastName, email, password) VALUES (?,?,?,?)"
    db.query(sqlInsert,[firstName, lastName, email, password], (err, result) => {
        // console.log(err);
        console.log({result});   
        if (err){
            // console.log(err);
            res.send({err: err})
        } 
        const sqlFind = " SELECT * From users  where email = ? AND  password = ?"
        db.query(sqlFind,[email, password], 
        (err, result) => {
            if (err){
                // console.log(err);
                res.send({err: err})
            } 
            if (result.length > 0) {
                jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token) =>{
                    
                    res.send({ result, auth : token});
                })
            } 
    })  
    }) 
});


app.post("/login", (req, res)=> {
    // const firstName = req.body.firstName
    // const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password
    const sqlInsert = " SELECT * From users  where email = ? AND  password = ?"
    db.query(sqlInsert,[email, password], 
        (err, result) => {
            if (err){
                // console.log(err);
                res.send({err: err})
            } 
            if (result.length > 0) {
                jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token) =>{
                    
                    res.send({ result,auth:token});
                })
            } else{
                res.send({ message: "Wrong username password"});
            }
        // console.log(result);
        // res.send("hello")
    })

})



app.post("/logged", (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const date = req.body.date
    const loggedDuration = req.body.loggedDuration
    const breaktime = req.body.password
    const sqlInsert = "INSERT INTO clockIn (userId, lastName, email, password) VALUES (?,?,?,?)"
    db.query(sqlInsert,[firstName, lastName, email, password], (err, result) => {
        // console.log(err);
        console.log({result});   
        if (err){
            // console.log(err);
            res.send({err: err})
        } 
        const sqlFind = " SELECT * From users  where email = ? AND  password = ?"
        db.query(sqlFind,[email, password], 
        (err, result) => {
            if (err){
                // console.log(err);
                res.send({err: err})
            } 
            if (result.length > 0) {
                jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token) =>{
                    
                    res.send({ result, auth : token});
                })
            } 
    })  
    }) 
});





app.listen(3001, () => {
    console.log("3001")
});