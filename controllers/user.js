const User = require("../modules/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SecretKey = "1234";
const registerUser = async (req, res) => {
  const userDetails = {
    email: req.body.email,
    name: req.body.name,
    mobileNo: req.body.mobileNo,
    role: req.body.role,
  };

  const plainTextPassword = req.body.password;

  const salt = await bcrypt.genSalt(10);

  const passwordHash = await bcrypt.hash(plainTextPassword, salt);

  userDetails.password = passwordHash;

  const newUser = new User(userDetails);
  await newUser.save();
  res.json({ success: true, msg: "user registration successfully" });
};

const userLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res
      .staus(404)
      .json({ success: false, msg: "User is not registered" });
  }
  const hashPassword = await user.password;
  const isvalidPassword = await bcrypt.compare(password, hashPassword);

  if (!isvalidPassword) {
    return res.status(404).json({ success: false, msg: "Incorrect Password" });
  }
  const Token_payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(Token_payload, JWT_SecretKey);
  await User.findOneAndUpdate(user._id, { token });
  return res
    .status(200)
    .json({ success: true, msg: "user login sucessfully", token });
};

const userLogout = async (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(404).json({ status: "fail", msg: "Token not found" });
  } else {
    const decodedToken = jwt.decode(token);

    await User.findByIdAndUpdate(decodedToken.id, { token: "" });
    return res.json({ status: true, msg: "logout sucessful" });
  }
};

module.exports = {
  registerUser,
  userLogin,
  userLogout,
};
