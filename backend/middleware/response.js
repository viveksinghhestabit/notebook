const jwt = require("jsonwebtoken");

const res_success = (res, data) => {
  const response = {
    status: 200,
    message: "Success",
    data: data,
  };
  return res.status(200).send(response);
};

const res_error = (res, err) => {
  console.error(err);
  res.status(500).send("Server error", err);
};

const res_not_found = (res, msg) => {
  return res.status(404).json({ msg: msg });
};

const res_not_authorized = (res, msg) => {
  return res.status(401).json({ msg: msg });
};

const jwtSign = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

module.exports = {
  res_success,
  res_error,
  res_not_found,
  res_not_authorized,
  jwtSign,
};
