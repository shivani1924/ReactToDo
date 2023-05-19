const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const cookieParser = require("cookie-parser");
const { verifyAccessToken } = require("./verifyToken");



const login_routes = require("./routes/login");
const operations_routes = require("./routes/operations")

//Middleware................................................

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(login_routes);

app.use(verifyAccessToken);
app.use(operations_routes);

app.listen(3001, () => {
  console.log("3001");
});
