const studentModel = require("./../../models/studentModel");

const getStudentDetails = async (req, res) => {
  try {
    const studentDetails = await studentModel.find();
    res.json({
      data: studentDetails,
      message: "All student details fetched successfully",
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

module.exports = getStudentDetails;
