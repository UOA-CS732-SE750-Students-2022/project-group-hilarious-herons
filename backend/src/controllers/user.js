const {
  createUser,
  retrieveUser,
  updateUser,
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

    res.send(post);
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
      res.status(404);
    }

    const newUserObj = req.body;

    user.firebaseUUID = newUserObj.firebaseUUID;
    user.displayName = newUserObj.displayName;
    user.firstName = newUserObj.firstName;
    user.lastName = newUserObj.lastName;
    user.posts = newUserObj.posts;
    user.favourites = newUserObj.favourites;
    user.followingUsers = newUserObj.followingUsers;

    updateUser(user);

    res.status(200).json({
      success: true,
      ...user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      info: err.message,
    });
  }
};
