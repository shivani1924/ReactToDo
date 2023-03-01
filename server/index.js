const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const jwtKey = 'f-t';
const cookieParser = require("cookie-parser");
const {verifyAccessToken} = require('./verifyToken')



const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "firsttouch",
});


//Middleware................................................
//----------------------------------------------------------


app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())  

app.post("/signup", (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password
    const sqlInsert = "INSERT INTO users (firstName, lastName, email, password) VALUES (?,?,?,?)"
    db.query(sqlInsert,[firstName, lastName, email, password], (err, result) => {
        if (err){
            res.send({err: err})
        } 
        const sqlFind = " SELECT * From users  where email = ? AND  password = ?"
        db.query(sqlFind,[email, password], 
        (err, result) => {
            if (err){
                res.send({err: err})
            } 
            if (result.length > 0) {
                jwt.sign({result},jwtKey,{expiresIn:"1h"},(err,token) =>{
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
                res.send({err: err})
            }
            if (result.length > 0) {
                jwt.sign({"id":result.idusers},jwtKey,{expiresIn:"1h"} ,(err,token) =>{
                    if(token){  
                        res.send({ result,auth:token})
                    }
                })
            } else{
                res.send({ message: "Wrong username password"});
            }
    })
})

app.post("/logged", verifyAccessToken , async(req, res) => {
    const clockInTime = req.body.clockInTime
    const localDate = req.body.localDate
    const loggedDuration = req.body.loggedDuration
    const breakduration = req.body.breakduration
    const id = req.body.id
    const status = req.body.status

    const resultfind = `select * from clockIn where userId = ${id} and date="${localDate}"`;
    await db.query(resultfind,(err,result)=>{
        if(result){
            if(result.length>0){
                return res.status(403).json({"message":"you are not allowed to login multiple times in a day"})
            }
            if(result.length==0){

                const sqlInsert = "INSERT INTO clockIn (userId,status, clockInTime, clockInAvg, break, date) VALUES (?,?,?,?,?,?)"
                db.query(sqlInsert,[id,status, clockInTime, loggedDuration, breakduration, localDate], (err, result) => {
                    if (err){
                        res.send({err: err})
                    } 
                    if (result){
                        res.send({res: result})
                    }
                }) 
            }
        }   
    }
    )
});


app.post("/clockout", verifyAccessToken, async(req, res) => {
    const id = req.body.id
    const status = req.body.status

    const clockInTime = req.body.clockInTime
    const localDate = req.body.localDate
    const loggedDuration = req.body.loggedDuration
    const stringloggedDuration = (loggedDuration).toString()
    const breakduration = req.body.breakduration

    const sqlInsert = "UPDATE clockIn SET status=?, clockInAvg=? , break=? WHERE userId=? and date=?"
const data = await db.query(sqlInsert,[status,stringloggedDuration, breakduration,id, localDate]);
    db.query(sqlInsert,[status, stringloggedDuration, breakduration,id, localDate], (err, result) => {
       
        if (err){
            res.send({err: err})
        } 
    }) 
});



app.post("/resume", verifyAccessToken, (req, res) => {
    const id = req.body.id
    const localDate = req.body.localDate
    const breakduration = req.body.breakduration
    const sqlInsert = "UPDATE clockIn SET break=? WHERE userId=? and date=?"
    db.query(sqlInsert,[breakduration,id, localDate], (err, result) => {
         
        if (err){
            res.send({err: err})
        } 
    }) 
});



app.post("/task",verifyAccessToken, (req, res) => {
    const userId = req.body.userId
    const id = req.body.id
    const todo = req.body.todo
    const startTime = req.body.startTime
    const endTime = req.body.endTime
    const date = req.body.date
    const sqlInsert = "INSERT INTO task (userId,taskId, todo, start, end, date) VALUES (?,?,?,?,?,?)"
    db.query(sqlInsert,[userId, id, todo, startTime, endTime, date], (err, result) => {
        if (err){
            res.send({err: err})
        } 
        else{
            res.send({result:result})
        }
    }) 
});


app.post("/selectedDate", verifyAccessToken, (req, res)=> {

    const selectedDate = req.body.selectedDate
    const id = req.body.id
    const sqlInsert = " SELECT * From clockin where date = ? AND  userId = ?"
    db.query(sqlInsert,[selectedDate, id], 
        (err, clockinresult) => {
            if (err){
                res.send({err: err})
            } else {
                const sqlGet = " SELECT * From task where date = ? AND  userId = ?"

                db.query(sqlGet,[selectedDate, id], 
                    (err, result) => {
                        if (err){
                            res.send({err: err})
                        } else {
                        res.send({clockin:clockinresult,selectedDate:result})

                    }
                })
            }
    })
    
})




app.post("/getTask", verifyAccessToken, (req, res)=> {
    const selectedDate = req.body.selectedDate
    const Id = req.body.id
    
    const sqlInsert = " SELECT * From task  where date = ? AND  userId = ?"
    db.query(sqlInsert,[selectedDate, Id], 
        (err, result) => {
            if (err){
                res.send({err: err})
            } else {
                res.send({res:result});
            }
    })

})

app.post("/loggedstatus", verifyAccessToken,  (req, res)=> {
    
    const date = req.body.localDate
    const id = req.body.id
    const sqlInsert = " SELECT * From clockin  where date = ? AND  userId = ?"
    db.query(sqlInsert,[date, id], 
        (err, result) => {
            if (err){
                res.send({err: err})
            } else {
                res.send({res:result});
            }
    })

})


app.listen(3001, () => {
    console.log("3001")
});
