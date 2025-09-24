var express = require("express");
var router = express.Router();
var httpStatus = require("http-status");
const app = require("./app/app.routes");
const admin = require("./admin/admin.routes");

router.get("/", async function (req, res, next) {
  return res.send({
    message: "Welcome Demo Node App",
  });
});

router.use("/api", app);

router.use("/api/admin", admin);

module.exports = router;
