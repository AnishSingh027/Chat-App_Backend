const mongoose = require("mongoose");

const DBconnect = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/chat-app");
};

module.exports = { DBconnect };
