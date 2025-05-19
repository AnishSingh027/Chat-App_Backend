const express = require("express");
const { userSignup, userLogin, userLogout } = require("../controllers/auth");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/logout", authUser, userLogout);

module.exports = router;
