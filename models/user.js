const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 15,
    },
    gender: {
      type: String,
      emum: ["male", "female"],
      required: true,
      lowercase: true,
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCpY5LtQ47cqncKMYWucFP41NtJvXU06-tnQ&s",
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  if (!validator.isStrongPassword(user.password)) {
    throw new Error("Password is not strong");
  }

  user.password = await bcrypt.hash(user.password, 10);

  next();
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
