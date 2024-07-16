const express = require("express");
const { config } = require("dotenv");
const connectDB = require("./db");
const cors = require("cors");
const mainroute=require("./Routes/index")
const app = express();
config();

connectDB();

app.use(cors());
app.use(express.json());


app.use("/api/v1",mainroute)

app.listen(3000, () => {
  console.log("Server listning to 3000");
});
