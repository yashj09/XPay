const { mongoose } = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Mongo connected");
  } catch (error) {
    console.error("Error", error);
    process.exit(1);
  }
};

module.exports = connectDB ;
