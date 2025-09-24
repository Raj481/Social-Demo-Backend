var express = require("express");
var router = express.Router();
var fcmService = require("../../../config/firebase.service");

router.get("/", async function (req, res, next) {
  res.send({
    message: "Welcome Api User",
  });
});

router.post("/login", async function (req, res, next) {
  var { email, password } = req.body;
  try {
    const userRecord = await fcmService.verifyUserLogin({ email, password });
    console.log(">>>>/loginUser" + userRecord);
    if (userRecord) {
      return res.send({
        statusCode: 200,
        data: userRecord,
      });
    }
  } catch (error) {
    res.send({
      statusCode: 400,
      message: error.message,
    });
  }
});

router.post("/register", async function (req, res, next) {
  const { firstName, lastName, mobileNumber, email, password } = req.body;
  try {
    const isUserRecord = await fcmService.checkIfUserExistsByEmail(email);
    if (isUserRecord == true) {
      return res.status(400).json({
        statusCode: 400,
        message: "User email has already registered.",
      });
    }

    /// Create user for firebase authentication
    const firebaseUser = await fcmService.createUser({
      email: email,
      password: password,
    });

    if (firebaseUser) {
      /// Api response
      res.status(200).json({
        statusCode: 200,
        message: "User registered successfully",
        user: {
          uid: firebaseUser.uid,
          firstName: firstName,
          lastName: lastName,
          mobileNumber: mobileNumber,
          email: email,
          password: password,
        },
      });
    }
  } catch (error) {
    res.status(400).json({ statusCode: 400, message: error.message });
  }
});

router.post("/delete", async function (req, res, next) {
  var { uid } = req.body;
  try {
    const userRecord = await fcmService.deleteUser({ uid });
    console.log(">>>>/loginUser" + userRecord);
    if (userRecord) {
      res.send({
        statusCode: 200,
        message: "User deleted successfully.",
        data: userRecord,
      });
    }
  } catch (error) {
    res.send({
      statusCode: 400,
      message: error.message,
    });
  }
});

module.exports = router;
