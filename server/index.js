const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const mysql = require("mysql");
const cors = require("cors");
// const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { response } = require("express");
const jwtKey = 'f-t';
// const session = require("cookie-parder");
const cookieParser = require("cookie-parser");




const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "firsttouch",
});

app.use(cors({origin: ["http://localhost:3000"]}))
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
        // console.log(err);
        // console.log({result});   
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
                    // res.cookie("token",token ,{httpOnly : true})

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
                jwt.sign({"id":result.idusers},jwtKey,(err,token) =>{
                    if(token){
                        // const t = token.toString()
                        res.cookie("token",token, {
                            expires: new Date(Date.now() + 25892000000)
                            // httpOnly:true
                        });
                        res.send({ result,auth:token});
                        localStorage.setItem("token",token);
                        // res.session = {
                        //     jwt: token
                        // };
                        // console.log(token);
                        // res.session = {
                        //     jwt: token
                        // };
                        console.log({result});

                    }

                })
            } else{
                res.send({ message: "Wrong username password"});
            }
    })

})

// app.post("/loggedstatus", async(req,res) => {

// })

app.post("/logged", async(req, res) => {
    // console.log(req);
    // const [id,clockInTime,localDate,loggedDuration,breakduration] = req.body
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
                console.log(result)

                const sqlInsert = "INSERT INTO clockIn (userId,status, clockInTime, clockInAvg, break, date) VALUES (?,?,?,?,?,?)"
                db.query(sqlInsert,[id,status, clockInTime, loggedDuration, breakduration, localDate], (err, result) => {
                    console.log({result});   
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


app.post("/clockout", async(req, res) => {
    const id = req.body.id
    const status = req.body.status

    // console.log(id);
    const clockInTime = req.body.clockInTime
    const localDate = req.body.localDate
    const loggedDuration = req.body.loggedDuration
    const stringloggedDuration = (loggedDuration).toString()
    const breakduration = req.body.breakduration
    // console.log(typeof(stringloggedDuration));
    // console.log(typeof(breakduration)); 

    const sqlInsert = "UPDATE clockIn SET status=?, clockInAvg=? , break=? WHERE userId=? and date=?"
const data = await db.query(sqlInsert,[status,stringloggedDuration, breakduration,id, localDate]);
    db.query(sqlInsert,[status, stringloggedDuration, breakduration,id, localDate], (err, result) => {
        // console.log(err);
        console.log({result});   
        if (err){
            // console.log(err);
            res.send({err: err})
        } 
    }) 
});



app.post("/resume", (req, res) => {
    const id = req.body.id
    // console.log(id);
    // const clockInTime = req.body.clockInTime
    const localDate = req.body.localDate
    // const loggedDuration = req.body.loggedDuration
    const breakduration = req.body.breakduration
    const sqlInsert = "UPDATE clockIn SET break=? WHERE userId=? and date=?"
    db.query(sqlInsert,[breakduration,id, localDate], (err, result) => {
        // console.log(err);
        console.log({result});   
        if (err){
            // console.log(err);
            res.send({err: err})
        } 
    }) 
});



app.post("/task", (req, res) => {
    const userId = req.body.userId
    const id = req.body.id
    // console.log(userId);
    const todo = req.body.todo
    const startTime = req.body.startTime
    const endTime = req.body.endTime
    const date = req.body.date
    const sqlInsert = "INSERT INTO task (userId,taskId, todo, start, end, date) VALUES (?,?,?,?,?,?)"
    db.query(sqlInsert,[userId, id, todo, startTime, endTime, date], (err, result) => {
        // console.log(err);
        // console.log({result});   
        if (err){
            // console.log(err);
            res.send({err: err})
        } 
        else{
            res.send({result:result})
        }
    }) 
});


app.post("/selectedDate", (req, res)=> {
        const selectedDate = req.body.selectedDate
        const id = req.body.id
    // console.log(id);
    const sqlInsert = " SELECT * From clockin where date = ? AND  userId = ?"
    db.query(sqlInsert,[selectedDate, id], 
        (err, clockinresult) => {
            if (err){
                // console.log(err);
                res.send({err: err})
            } else {
                // console.log({res:clockinresult});
                // var a = {clockinresult:clockinresult}

                const sqlGet = " SELECT * From task where date = ? AND  userId = ?"

                db.query(sqlGet,[selectedDate, id], 
                    (err, result) => {
                        if (err){
                            // console.log(err);
                            res.send({err: err})
                        } else {
                        //  res.send({res:result});
                        res.send({clockin:clockinresult,selectedDate:result})

                    }
                })
            }
    })
    
})




app.post("/getTask", (req, res)=> {
    // const firstName = req.body.firstName
    // const lastName = req.body.lastName
    const selectedDate = req.body.selectedDate
    const Id = req.body.id
    // console.log(id);
    const sqlInsert = " SELECT * From task  where date = ? AND  userId = ?"
    db.query(sqlInsert,[selectedDate, Id], 
        (err, result) => {
            if (err){
                // console.log(err);
                res.send({err: err})
            } else {
                res.send({res:result});
            }
    })

})

app.post("/loggedstatus", (req, res)=> {
    // const firstName = req.body.firstName
    // const lastName = req.body.lastName
    const date = req.body.localDate
    const id = req.body.id
    // console.log(id);
    const sqlInsert = " SELECT * From clockin  where date = ? AND  userId = ?"
    db.query(sqlInsert,[date, id], 
        (err, result) => {
            if (err){
                // console.log(err);
                res.send({err: err})
            } else {
                res.send({res:result});
            }
    })

})


app.listen(3001, () => {
    console.log("3001")
});
