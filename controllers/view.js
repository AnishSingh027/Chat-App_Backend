const User = require("../models/user");

const showConnections = async (req, res) => {
  const loggedInUser = req.user;

  try {
    const userConnections = (await User.find({})).filter(
      (user) => user._id != loggedInUser._id
    );
    return res.send(userConnections);
  } catch (err) {
    return res.status(400).end(err.message);
  }
};

const showUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    return res.json(user);
  } catch (err) {
    return res.status(400).end(err.message);
  }
};

const editProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const allowedFields = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "photoUrl",
    ];

    const isAllowed = Object.keys(req.body).every((i) =>
      allowedFields.includes(i)
    );

    if (!isAllowed) {
      throw new Error("Cannot edit confidential data!!");
    }
    Object.keys(req.body).forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });
    await user.save();
    return res.json({ message: "User data updated", user });
  } catch (err) {
    return res.status(400).end(err.message);
  }
};

module.exports = { showConnections, showUserProfile, editProfile };
