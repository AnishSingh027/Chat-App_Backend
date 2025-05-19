const express = require("express");
const { authUser } = require("../middlewares/auth");
const {
  showConnections,
  showUserProfile,
  editProfile,
} = require("../controllers/view");

const router = express.Router();

router.get("/connections", authUser, showConnections);
router.get("/profile", authUser, showUserProfile);
router.patch("/profile/edit", authUser, editProfile);

module.exports = router;
