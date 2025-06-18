const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const studentRoutes = require("./routes/studentRoutes");
const cookieParser = require("cookie-parser");
const { startCronJob } = require("./services/cfCronService.js");
const app = express();
app.use(express.json({ limit: "20mb" })); // adjust as needed
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use(bodyParser.json({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "your-production-domain"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// routes

app.use("/student", studentRoutes);
// app.use("/destination", destinationRoutes);
// app.use("/reviews", reviewRoutes);

const PORT = 8000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log("error in connecting to database");
    console.log(err);
  }
};
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("mongodb connected");
    console.log(`server is running on port ${PORT}`);
    startCronJob();
  });
});
