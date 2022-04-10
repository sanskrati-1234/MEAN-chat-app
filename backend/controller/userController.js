const asyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const User = require("../models/userModel");
const { use } = require("../routes/userRoute");
const registerUser = asyncHandler(async () => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.send(400);
    throw new Error("Please eneter all the fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.send(400);
    throw new Error("User Already exist");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.send(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.send(400);
    throw new Error("Fail to create user");
  }
});

module.exports = { registerUser };
