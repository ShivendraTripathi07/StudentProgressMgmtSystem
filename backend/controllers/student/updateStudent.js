const studentModel = require("./../../models/studentModel");

const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await studentModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedStudent)
      return res.status(404).json({ message: "Student not found" });

    res.json({ success: true, data: updatedStudent });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Update failed", error: err.message });
  }
};
module.exports = updateStudent;
