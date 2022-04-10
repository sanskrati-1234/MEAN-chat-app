const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoute");

app.use(cors());
dotenv.config();
connectDB();
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("api/users", userRoute);
app.get("/api/chat", (req, res) => {
  console.log(chats);
  res.send(chats);
});
app.get("/api/chat/:id", (req, res) => {
  //console.log(req.params.id);
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server Started on PORT ${PORT} `));
