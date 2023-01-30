const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const MONGO = process.env.MONGO_URI
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected:${conn.connection.host}`);
  } catch (error) {
    console.log("error:", error.message);
    process.exit();
  }
};

module.exports = connectDB;
