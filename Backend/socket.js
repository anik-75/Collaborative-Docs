const io = require("./index");

io.on("connection", (socket) => {
  // create a room for each document and emit data changes to that room
  socket.on("join-document", (docId) => {
    socket.join(docId);

    socket.on("text-change", (data) => {
      io.to(docId).emit("receive-change", data);
    });
  });

  console.log(socket.id);
});
