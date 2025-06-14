const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
// const userRoutes = require("./routes/userRoutes");
// const destinationRoutes = require("./routes/destinationroutes");
// const reviewRoutes = require("./routes/reviewRoutes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json({ limit: "20mb" })); // adjust as needed
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use(bodyParser.json({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "your-production-domain"], // Add your frontend domains
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// routes

// app.use("/user", userRoutes);
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
  });
});
