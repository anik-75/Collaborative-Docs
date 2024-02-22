const dotenv = require("dotenv");
dotenv.config();
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const RunDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const documentRoutes = require("./routes/documentRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/page.html");
  return;
});
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/document", documentRoutes);

const server = app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

// Socket.io
const { Server } = require("socket.io");

const io = new Server(server, {
  /* options (cors)*/
  cors: "https:localhost:5173",
});
module.exports = io;
require("./socket");
