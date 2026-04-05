require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT;
const MONGO_URI_USER_DB = process.env.MONGO_URI_USER_DB;

const startServeer = async () => {
  try {
    mongoose.connect(MONGO_URI_USER_DB);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("DB connection error !", err);
    process.exit(1);
  }
};

startServeer();
