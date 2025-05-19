const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../config/jwt");

const userSignup = async (req, res) => {
  const { firstName, lastName, age, gender, photoUrl, email, password } =
    req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = new User({
      firstName,
      lastName,
      age,
      gender,
      photoUrl,
      email,
      password,
    });

    await user.save();
    return res.end(`User created successfully`);
  } catch (err) {
    return res.status(400).end(err.message);
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!validator.isEmail(email)) {
      throw new Error("Email is incorrect");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not exist");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      gender: user.gender,
      photoUrl: user.photoUrl,
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 60 * 60 * 1000,
      })
      .send("Welcome to our page");
  } catch (err) {
    return res.status(400).end(err.message);
  }
};

const userLogout = (req, res) => {
  try {
    return res
      .clearCookie("token", {
        httpOnly: true,
      })
      .end("User logged out successfully");
  } catch (err) {
    return res.status(400).end(err.message);
  }
};

module.exports = { userSignup, userLogin, userLogout };
