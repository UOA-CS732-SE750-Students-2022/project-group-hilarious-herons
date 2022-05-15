const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("../../config/hilarious-herons-service-account.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

/**
 * Check if an account is authenticated
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.checkAuth = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    res.status(403).send("Unauthorized");
  } else {
    firebaseAdmin
      .auth()
      .verifyIdToken(authToken)
      .then((res) => {
        next();
      })
      .catch((err) => {
        res.status(403).send("Unauthorized");
      });
  }
};
