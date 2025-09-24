var express = require("express");
var router = express.Router();

router.get("/", async function (req, res, next) {
  res.send({
    message: "Welcome Posts",
  });
});

router.get("/detail", async function (req, res, next) {
  res.send({
    message: "Welcome app user login",
  });
});

router.delete("/delete", async function (req, res, next) {
  res.send({
    message: "Post Deleted Successfully",
  });
});

module.exports = router;
