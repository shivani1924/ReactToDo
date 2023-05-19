const express = require("express");
const router = express.Router();


const { 
    logged,
    clockout,
    resume,
    task,
    selectedDate,
    getTask,
    totaltime,
    loggedstatus,
    loggedduration,
    getDashboardWeeklyChartData,
    editTask,
    deletetask 
}
= require("../contollers/operations");




router.route("/logged").post(logged);
router.route("/clockout").post(clockout);
router.route("/resume").post(resume);
router.route("/task").post(task);
router.route("/selectedDate").post(selectedDate);
router.route("/getTask").post(getTask);
router.route("/totaltime").post(totaltime);
router.route("/loggedstatus").post(loggedstatus);
router.route("/loggedduration").post(loggedduration);
router.route("/getDashboardWeeklyChartData").post(getDashboardWeeklyChartData);
router.route("/deletetask").post(deletetask);
router.route("/editTask").post(editTask);


module.exports = router;
