const {
  createUser,
  retrieveUser,
  updateUser,
  retrieveByFirebaseUID,
} = require("../models/User/user-dao");

/**
 * Create user
 * @param {*} req
 * @param {*} res 201 success, 500 internal error
 */
exports.createUser = async (req, res) => {
  try {
    const userObj = req.body;
    const newUser = await createUser(userObj);

    res
      .status(201)
      .header("Location", `/api/user/${newUser._id}`)
      .json(newUser);
  } catch (err) {
    res.status(500).json({
      success: false,
      info: err.message,
    });
  }
};

/**
 * Get yser with given id
 * @param {*} req
 * @param {*} res 201 success, 404 not found, 500 internal error
 */
exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await retrieveUser(id);

    if (user === undefined || user === null || user.length === 0) {
      res.status(404);
    }

    res.send(user);
  } catch (e) {
    res.status(500).json({
      success: false,
      info: e.message,
    });
  }
};

/**
 * Get user with a specific firebase uid
 * @param {*} req
 * @param {*} res 200 success, 404 not found, 500 internal error
 */
exports.getUserFromFirebaseUID = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await retrieveByFirebaseUID(id);

    if (user === undefined || user === null || user.length === 0) {
      res.status(404);
    }

    res.send(user);
  } catch (e) {
    res.status(500).json({
      success: false,
      info: e.message,
    });
  }
};

/**
 * Update user document
 * @param {*} req
 * @param {*} res 204 success, 404 not found, 500 internal error
 */
exports.updateUser = async (req, res) => {
  try {
    const userID = req.params.id;
    const user = await retrieveUser(userID);

    if (user === undefined || user === null || user.length === 0) {
      res.sendStatus(404);
    }

    const updatedUserObj = req.body;
    updatedUserObj._id = userID;

    updateUser(updatedUserObj);

    res.status(204).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      info: err.message,
    });
  }
};
