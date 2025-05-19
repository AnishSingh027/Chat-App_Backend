const express = require("express");
const { authUser } = require("../middlewares/auth");
const {
  sendMessageToSpecificUser,
  seeSpecificUserMessage,
} = require("../controllers/message");

const router = express.Router();

router.post("/send/:userId", authUser, sendMessageToSpecificUser);
router.get("/:userId", authUser, seeSpecificUserMessage);

module.exports = router;
