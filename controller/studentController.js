const Student = require("../models/studentModel");

exports.listAllStudent = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const startIndex = (page - 1) * perPage;
    const students = await Student.find()
      .skip(startIndex)
      .limit(perPage)
      .exec();
    if (students.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.addStudent = async (req, res) => {
  try {
    let { first_name, last_name, date_of_birth, email } = req.body;
    if (!first_name || !last_name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: "Student already exists" });
    }

    const newStudent = new Student({
      first_name,
      last_name,
      date_of_birth,
      email,
    });

    await newStudent.save();
    res
      .status(200)
      .json({ success: true, message: "Student added successfully" });
  } catch (error) {
    console.log("Error in adding: " + error);
    res.status(500).json({ success: false, message: "Adding student failed" });
  }
};

exports.updateStudents = async (req, res) => {
  const { studentId } = req.params;
  try {
    const { first_name, last_name, email, date_of_birth } = req.body;
    const updateFields = {};
    if (first_name) updateFields.first_name = first_name;
    if (last_name) updateFields.last_name = last_name;
    if (email) updateFields.email = email;
    if (date_of_birth) updateFields.date_of_birth = date_of_birth;

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedStudent) {
      res.status(404).json({ message: "Invalid student id" });
    } else {
      res.status(200).json({ message: "Student updated", updatedStudent });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Bad field type" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId) {
      return res.status(404).json({ error: "Student not found" });
    }
    const deleteStudent = await Student.findByIdAndDelete(studentId);
    if (!deleteStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ message: "Student is deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
};
