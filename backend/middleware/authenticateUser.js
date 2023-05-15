const jwt = require("jsonwebtoken");
const { res_not_authorized } = require("./response");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    res_not_authorized(res, "Access Denied");
  }
  try {
    const verified = jwt.decode(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res_not_authorized(res, "Invalid Token");
  }
};
