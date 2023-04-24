const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const jwtKey = "f-t";
const cookieParser = require("cookie-parser");
const { verifyAccessToken } = require("./verifyToken");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "firsttouch",
});

//Middleware................................................
//----------------------------------------------------------

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/signup", (req, res) => {
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
});

app.post("/login", (req, res) => {
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
});

app.use(verifyAccessToken);

app.post("/logged", async (req, res) => {
  const clockInTime = req.body.clockInTime;
  const localDate = req.body.localDate;
  const loggedDuration = req.body.loggedDuration;
  const breakduration = req.body.breakduration;
  const id = req.body.id;
  const status = 0;

  const sqlInsert =
    "INSERT INTO clockIn (userId,status, clockInTime, clockInAvg, break, date) VALUES (?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [id, status, clockInTime, loggedDuration, breakduration, localDate],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result) {
        res.send({ res: result });
      }
    }
  );
});

app.post("/clockout", async (req, res) => {
  const id = req.body.id;
  const status = req.body.status;
  const clockInTime = req.body.clockInTime;
  const clockOutTime = req.body.clockOutTime;
  const localDate = req.body.localDate;
  const loggedDuration = req.body.loggedDuration;
  const stringloggedDuration = loggedDuration.toString();
  const breakduration = req.body.breakduration;

  const sqlInsert =
    "UPDATE clockIn SET status=?, clockInAvg=? , break=? , clockOutTime=? WHERE userId=? and clockInTime=?";
  db.query(
    sqlInsert,
    [
      status,
      stringloggedDuration,
      breakduration,
      clockOutTime,
      id,
      clockInTime,
    ],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
    }
  );
});

app.post("/resume", (req, res) => {
  const id = req.body.id;
  const localDate = req.body.localDate;
  const breakduration = req.body.breakduration;
  const sqlInsert = "UPDATE clockIn SET break=? WHERE userId=? and date=?";
  db.query(sqlInsert, [breakduration, id, localDate], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
  });
});

app.post("/task", (req, res) => {
  const userId = req.body.userId;
  const id = req.body.id;
  const todo = req.body.todo;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const date = req.body.date;
  const clockInAvg = req.body.clockInAvg;
  const sqlInsert =
    "INSERT INTO task (userId,taskId, todo, start, end, date,clockInAvg) VALUES (?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [userId, id, todo, startTime, endTime, date, clockInAvg],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ result: result });
      }
    }
  );
});

app.post("/selectedDate", (req, res) => {
  const selectedDate = req.body.selectedDate;
  const id = req.body.id;
  const sqlInsert = " SELECT * From clockin where date = ? AND  userId = ?";
  db.query(sqlInsert, [selectedDate, id], (err, clockinresult) => {
    if (err) {
      res.send({ err: err });
    } else {
      const sqlGet = " SELECT * From task where date = ? AND  userId = ?";

      db.query(sqlGet, [selectedDate, id], (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          res.send({ clockin: clockinresult, selectedDate: result });
        }
      });
    }
  });
});

app.post("/getTask", (req, res) => {
  const selectedDate = req.body.localDate;
  const Id = req.body.id;

  const sqlInsert = " SELECT * From task  where date = ? AND  userId = ?";
  db.query(sqlInsert, [selectedDate, Id], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send({ res: result });
    }
  });
});

app.post("/totaltime", (req, res) => {
  const localDate = req.body.localDate;
  const Id = req.body.id;

  const sqlInsert = " SELECT * From clockin where date = ? AND  userId = ?";
  db.query(sqlInsert, [localDate, Id], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send({ res: result });
    }
  });
});

app.post("/loggedstatus", (req, res) => {
  const date = req.body.localDate;
  const id = req.body.id;
  const sqlInsert = " SELECT * From clockin  where date = ? AND  userId = ?";
  db.query(sqlInsert, [date, id], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send({ res: result });
    }
  });
});

app.post("/loggedduration", (req, res) => {
  const userId = req.body.userId;
  const date = req.body.date;
  const clockInAvg = req.body.clockInAvg;
  const sqlInsert = "SELECT * From loggedduration where userId=? and date=?";
  db.query(sqlInsert, [userId, date], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      if (result.length > 0) {
        const totalDuration =
          parseFloat(clockInAvg) + parseFloat(result[0].duration);
        console.log(totalDuration);
        const sqlInsert =
          "UPDATE loggedduration SET duration=? WHERE userId=? and date=?";
        db.query(sqlInsert, [totalDuration, userId, date], (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            res.send({ result: result });
          }
        });
      } else {
        const sqlInsert =
          "INSERT INTO loggedduration (userId,date,duration) VALUES (?,?,?)";
        db.query(sqlInsert, [userId, date, clockInAvg], (err, result) => {
          if (err) {
            res.send({ err: err });
          } else {
            res.send({ result: result });
          }
        });
      }
    }
  });
});

app.post("/getDashboardWeeklyChartData", (req, res) => {
  const userId = req.body.userId;
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
  var last = first + 5; // last day is the first day + 6

  var firstday = new Date(curr.setDate(first)).toLocaleDateString("en-US");
  var lastday = new Date(curr.setDate(last)).toLocaleDateString("en-US");

  let dateArray = [];
  for (i = 0; i < 5; i++) {
    dateArray[i] = {
      date: new Date(curr.setDate(first + i)).toLocaleDateString("en-US"),
    };
  }

  const sqlInsert =
    "SELECT * FROM loggedduration WHERE userID = ? AND date >= ? AND date <= ? ";
  db.query(sqlInsert, [userId, firstday, lastday], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      result.forEach((element) => {
        for (i = 0; i < 5; i++) {
          if (dateArray[i].date == element.date) {
            dateArray[i] = {
              date: element.date,
              duration: element.duration,
            };
          }
        }
      });
      res.send(dateArray);
    }
  });
});

app.post("/deletetask", (req, res) => {
  const id = req.body.taskId;
  const userId = req.body.id;
  const localDate = req.body.localDate;

  const sqlfind = "SELECT * From task  where taskId=? AND  userId = ?";
  db.query(sqlfind, [id, userId], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      const duration = parseFloat(result[0].clockInAvg);

      const sqlInsert = "DELETE From task  where taskId= ?  AND  userId = ?";
      db.query(sqlInsert, [id, userId], (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          const sqlfind =
            " SELECT duration From loggedduration  where date=? AND  userId = ?";
          db.query(sqlfind, [localDate, userId], (err, result) => {
            if (result) {
              const updatedClockInAvg =
                parseFloat(result[0].duration) - duration;
              const sqlInsert =
                "UPDATE loggedduration SET duration=? WHERE userId=? and date=?";

              db.query(
                sqlInsert,
                [updatedClockInAvg, userId, localDate],
                (err, result) => {
                  if (result) {
                    res.send({ res: result });
                  }
                }
              );
            }
          });
        }
      });
    }
  });
});

app.post("/editTask", (req, res) => {
  const editId = req.body.editId;
  const userId = req.body.userId;
  const todo = req.body.todo;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const date = req.body.date;
  const id = req.body.id;

  const sqlInsert =
    "UPDATE task SET todo=?, start=? , end=? , taskId =? WHERE userId=? and taskId=?";

  db.query(
    sqlInsert,
    [todo, startTime, endTime, id, userId, editId],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ res: result });
      }
    }
  );
});


// app.post("/fetchduration", (req, res) => {

//   const userId = req.body.userId;
//   const date = req.body.date;
//   const sqlInsert = "SELECT * From loggedduration where userId=? and date=?";
//   db.query(sqlInsert, [userId, date], (err, result) => {
//     if (err) {
//       res.send({ err: err });
//     } else {
//       res.send({ res: result });
//     }
//   });
// });

app.listen(3001, () => {
  console.log("3001");
});
