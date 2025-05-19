const Message = require("../models/message");
const User = require("../models/user");

const sendMessageToSpecificUser = async (req, res) => {
  const { message } = req.body;
  const fromUserId = req.user._id;
  const toUserId = req.params.userId;

  try {
    const toUser = await User.findById(toUserId);

    if (!toUser) {
      throw new Error("Another user not found");
    }

    if (
      !message ||
      message.trim().length === 0 ||
      message.trim().length > 1000
    ) {
      throw new Error("Message should be between 1 - 999 letters!!!");
    }

    const UserMessage = new Message({
      fromUserId,
      toUserId,
      message,
    });
    await UserMessage.save();
    return res.send("Message sent successfully");
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

const seeSpecificUserMessage = async (req, res) => {
  const fromUserId = req.user._id;
  const toUserId = req.params.userId;

  try {
    const toUser = await User.findById(toUserId);

    if (!toUser) {
      throw new Error("Another user not found");
    }

    const messages = await Message.find(
      {
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      },
      { message: 1 }
    );

    if (messages.length === 0) {
      return res.send("No messages found");
    }

    return res.json(messages);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

module.exports = { sendMessageToSpecificUser, seeSpecificUserMessage };
