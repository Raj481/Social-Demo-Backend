var express = require("express");
var router = express.Router();

router.get("/", async function (req, res, next) {
  res.send({
    message: "welcome social api base",
  });
});

// router.post("/detail", users.getUserById);

// router.get("/getAllUsers", users.getUser);

module.exports = router;
