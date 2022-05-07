const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("../../config/hilarious-herons-service-account.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

exports.checkAuth = (req, res, next) => {
  const authToken = req.headers.authToken;

  if (!authToken) {
    res.status(403).send("Unauthorized");
  } else {
    firebaseAdmin
      .auth()
      .verifyIdToken(authToken)
      .then(next())
      .catch(res.status(403).send("Unauthorized"));
  }
};
