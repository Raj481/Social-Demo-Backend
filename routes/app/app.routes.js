var express = require("express");
var router = express.Router();
const users = require("./users/users.routes");
const posts = require("./post/posts.routes");

router.get("/", async function (req, res, next) {
  res.send({
    message: "Welcome Api Base",
  });
});

router.use("/users", users);

router.use("/posts", posts);

// router.post("/detail", users.getUserById);

// router.get("/getAllUsers", users.getUser);

// router.post("/delete", users.deleteUser);

module.exports = router;
