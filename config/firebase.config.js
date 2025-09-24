// firebaseAdmin.js
const admin = require("firebase-admin");
const serviceAccount = require("./service_accounts/firebaseServiceAccountKey.json");
const { database } = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://test-app-f1170.firebaseio.com",
  databaseURL: "https://test-app-f1170-default-rtdb.firebaseio.com/",
});

module.exports = {
  admin,
  database,
};
