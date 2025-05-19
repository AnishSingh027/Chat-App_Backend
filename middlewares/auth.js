const { verifyToken } = require("../config/jwt");

const authUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).send("Token is invalid!!!");
  }
  const user = verifyToken(token);
  req.user = user;
  return next();
};

module.exports = { authUser };
