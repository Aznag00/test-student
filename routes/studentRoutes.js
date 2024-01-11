const express = require("express");
const {
  addStudent,
  listAllStudent,
  deleteStudent,
  updateStudents,
} = require("../controller/studentController");
const router = express.Router();

router.post("/add", addStudent);
router.get("/list", listAllStudent);
router.delete("/:studentId", deleteStudent);
router.patch("/update/:studentId", updateStudents);

module.exports = router;
