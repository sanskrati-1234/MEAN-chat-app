const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  console.log(name, email, password, pic);
  if (!name || !email || !password) {
    res.sendStatus(400);
    throw new Error("Please eneter all the fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.sendStatus(400);
    throw new Error("User Already exist");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.sendStatus(400);
    throw new Error("Fail to create user");
  }
});
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.sendStatus(400);
    throw new Error("Please enter all  values");
  }
  const userExists = await User.findOne({ email });
  if (userExists && (await userExists.matchPassword(password))) {
    res.json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      pic: userExists.pic,
      token: generateToken(userExists._id),
    });
  } else {
    res.send(400);
    throw new Error("Either email or password is invalid");
  }
});
module.exports = { registerUser, authUser };
