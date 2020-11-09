const express = require("express");
const io = require("socket.io");

const app = express();
const chat = io(app.listen(3000));

app.use(express.static("public"));

app.get("/", (req, res) => {
  return res.redirect("index.html");
});

chat.on("connection", user => {
  user.on('user connected', name => {
    user.name = name;

    chat.emit("users connected", chat.engine.clientsCount);
  });

  user.on("chat message", msg => {
    chat.emit("chat message", msg);
  });

  user.on('disconnect', () => {
    chat.emit("user disconnected", user.name);
  });
});
