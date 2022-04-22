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
    console.log("Line25 UserCon", user);
    console.log("Line 26", user._id);
    console.log("Line27", user._id.valueOf());
    const userId = user._id.valueOf();
    res.json({
      _id: userId,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: userId,
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
    const userId = userExists._id.valueOf();
    res.json({
      _id: userId,
      name: userExists.name,
      email: userExists.email,
      pic: userExists.pic,
      token: generateToken(userId),
    });
  } else {
    res.send(400);
    throw new Error("Either email or password is invalid");
  }
});

const allUser = asyncHandler(async (req, res) => {
  const keyword1 = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword1).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, authUser, allUser };
