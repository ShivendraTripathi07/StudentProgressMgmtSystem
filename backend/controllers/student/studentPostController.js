const studentModel = require("./../../models/studentModel");
const axios = require("axios");
const studentPostController = async (req, res) => {
  try {
    const { name, email, phone, cfHandle } = req.body;
    const cfRes = await axios.get(
      `https://codeforces.com/api/user.info?handles=${cfHandle}`
    );
    const { rating = 0, maxRating = 0 } = cfRes.data.result[0];
    if (!name) {
      throw new Error("Please provide the name");
    }
    if (!email) {
      throw new Error("Please provide the email");
    }
    if (!cfHandle) {
      throw new Error("Please provide the codeforces handle");
    }

    const userEmail = await studentModel.findOne({ email });
    // console.log(userEmail);
    if (userEmail) {
      throw new Error("User already exists");
    }
    const userData = new studentModel({
      name,
      email,
      phone,
      cfHandle,
      currentRating: rating,
      maxRating: maxRating,
      lastSynced: new Date(),
      autoEmailEnabled: true,
      reminderCount: 0,
    });
    const saveUser = await userData.save();
    res.json({
      data: saveUser,
      message: "User Created Successfully",
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

module.exports = studentPostController;
