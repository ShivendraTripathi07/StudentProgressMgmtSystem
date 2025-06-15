const express = require("express");
const studentPostController = require("../controllers/student/studentPostController");
const getStudentDetails = require("../controllers/student/studentdetails");
const particularStudentController = require("./../controllers/student/particularStudentController");
const updateStudent = require("../controllers/student/updateStudent");
const deleteStudent = require("../controllers/student/deleteStudent");
const router = express.Router();

router.post("/postStudentDetail", studentPostController);
router.get("/getAllStudents", getStudentDetails);
router.get("/particularStudent/:studentId", particularStudentController);
router.put("/updateStudent/:id", updateStudent);
router.delete("/deleteStudent/:id", deleteStudent);

module.exports = router;
