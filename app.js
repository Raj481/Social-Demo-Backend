// import necessary package
var express = require("express");
var http = require("http");
var mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// import custom package
const indexRouter = require("./routes/route.index");

const PORT = process.env.PORT || 3000;

/**
 * Get port from environment and store in Express.
 */
const app = express();
app.set("port", PORT);

app.use(
  express.urlencoded({ parameterLimit: 100000, limit: "50mb", extended: true })
);

app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

// enable cors
app.use(cors());
app.options("*", cors());
require("./config/db.config");
require("./config/firebase.config");
// require("dotenv").config();
// console.log(`Your port is ${process.env.FIREBASE_DATABASE_URL}`);
app.use("/", indexRouter);

/**
 * Create HTTP server.
 * Listen on provided port, on all network interfaces.
 */

var server = http.createServer(app);

server.listen(PORT, () => {
  console.info(`Listening to port ${PORT}`);
});

// server.on("error", onError);
// server.on("listening", onListening);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  // console.info(`Listening on 22222  ${bind}`);
}
