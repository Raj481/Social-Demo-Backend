const { admin, database } = require("./firebase.config");

async function verifyIdToken(idToken) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    console.log("User exists with UID:", uid);
    return uid; // User exists and is authenticated
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return null; // User does not exist or token is invalid
  }
}

async function checkIfUserExistsByUid(uid) {
  try {
    const userRecord = await admin.auth().getUser(uid);
    console.log("Successfully fetched user data:", userRecord.toJSON());
    return true; // User exists
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      console.log("User does not exist.");
      return false;
    } else {
      console.error("Error fetching user data:", error);
      return false;
    }
  }
}

async function checkIfUserExistsByEmail(email) {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    return true; // User exists
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      console.log("User does not exist.");
      return false;
    } else {
      console.error("Error fetching user data:", error);
      return false;
    }
  }
}

async function firebaseAllUsers() {
  try {
    return await admin.auth().listUsers(); // Fetch up to 1000 users at a time
  } catch (error) {
    console.error("Error listing users:", error);
  }
}

async function findUserByEmail(email) {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    return userRecord; // User exists
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      console.log("User does not exist.");
      throw new Error("User does not exist.");
    } else {
      throw new Error("User does not exist.");
    }
  }
}

async function createUser(params) {
  try {
    return await admin.auth().createUser({
      email: params.email,
      password: params.password,
    });
  } catch (e) {
    throw "Collection save into db failed.";
  }
}

function deleteUser(params) {
  var { uid } = params;
  try {
    admin
      .auth()
      .deleteUser(uid)
      .then(() => {
        console.log("Successfully deleted user");
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
        throw new Error("User verification failed.");
      });
  } catch (e) {
    throw new Error("User verification failed.");
  }
}

async function verifyUserLogin(params) {
  var { email, password } = params;
  try {
    const auth = admin.auth();
    await admin
      .signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(">>>>>>>" + user + ">>>>>>>>>>>>>" + user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(">>>>>>>" + errorCode + ">>>>>>>>>>>>>" + errorMessage);
        throw new Error("User verification failed.");
      });
    return {};
  } catch (e) {
    throw new Error("User verification failed.");
  }
}

module.exports = {
  firebaseAllUsers,
  findUserByEmail,
  deleteUser,
  verifyIdToken,
  checkIfUserExistsByUid,
  checkIfUserExistsByEmail,
  createUser,
  verifyUserLogin,
};
