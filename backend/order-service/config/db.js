const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_ORDERS_DB);
    console.log("db orders connected successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
