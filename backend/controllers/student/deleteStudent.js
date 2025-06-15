const studentModel = require("./../../models/studentModel");

const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await studentModel.findByIdAndDelete(req.params.id);
    if (!deletedStudent)
      return res.status(404).json({ message: "Student not found" });

    res.json({ success: true, message: "Student deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Delete failed", error: err.message });
  }
};
module.exports = deleteStudent;
