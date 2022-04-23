const {
  createUser,
  retrieveUser,
  updateUser,
  retrieveByFirebaseUID,
} = require("../models/User/user-dao");

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

exports.getUserFromFirebaseUID = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const user = await retrieveByFirebaseUID(id);

    if (user === undefined || user === null || user.length === 0) {
      res.status(404);
    }

    console.log(user);

    res.send(user);
  } catch (e) {
    res.status(500).json({
      success: false,
      info: e.message,
    });
  }
};

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
