const axios = require("axios");

/**
 * Get a test authen token
 * @returns token
 */
exports.getTestAuthToken = async () => {
  let email = process.env.AUTH_TEST_EMAIL;
  let password = process.env.AUTH_TEST_PASSWORD;
  let apiKey = process.env.AUTH_TEST_APIKEY;

  const res = await axios.post(
    `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );

  return res.data.idToken;
};
