const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const PORT = process.env.PORT || 4000;

io.on("connection", (socket) => {
  socket.on("result", ({ expression, answer }) => {
    io.emit("result", { expression, answer });
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

http.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
