const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB is connected ${con.connection.host}`);
  } catch (e) {
    console.log(`Error:${e.message}`);
    process.exit();
  }
};
module.exports = connectDB;
