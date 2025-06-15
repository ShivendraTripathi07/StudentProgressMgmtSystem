const studentModel = require("./../../models/studentModel");

const student = async (req, res) => {
  try {
    const { studentId } = req.params;
    const studentdetail = await studentModel.findById(studentId);
    res.json({
      data: studentdetail,
      message: "student details fetched successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    res.json({
      message: err.message,
      success: false,
      error: true,
    });
  }
};

module.exports = student;
