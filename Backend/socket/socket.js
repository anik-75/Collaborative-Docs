const cors = require("cors");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const port = 4000;
const io = require("socket.io")(server, {
  cors: "http://localhost:5500",
});
io.on("connection", (client) => {
  console.log(client.id);
  // client.on("event", (data) => {
  //   /* … */
  // });
  // client.on("disconnect", () => {
  //   /* … */
  // });
  client.on("edit", (data) => {
    console.log("fromclient" + data);
    io.emit("broadcast", data);
  });
});
server.listen(port, () => {
  console.log("socket running");
});

module.exports = io;
