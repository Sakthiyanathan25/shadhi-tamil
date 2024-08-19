const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { EMAIL, PASSWORD } = require("../env");
const nodemailer = require("nodemailer");
const crypto = require('crypto');

const registerUser = asyncHandler(async (req, res) => {
  const { name, phone, email, password, role } = req.body;

  if (!name || !phone || !password || !email) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const userExist = await User.findOne({ phone });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    phone,
    role,
    status: "active",
    password: hashedPassword,
  });

  if (user) {
    res.status(200).json({
      message: "User created successfully",
      token: generateJWT(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Internal server error");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  let reactivated = false;

  if (!user) {
    res.status(400);
    throw new Error("User doesn't exists...");
  }

  if (user.status === "deactived") {
    user.status = "active";
    reactivated = true;
    await user.save();
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    if (reactivated) {
      res.status(200).json({
        message: "Your account is reactivated",
        token: generateJWT(user.id),
      });
    } else {
      res.status(200).json({
        message: "Successfully Logged in",
        token: generateJWT(user.id),
      });
    }
  } else {
    res.status(404);
    throw new Error("Invalid credentials");
  }
});
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
};

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Handle password update if provided in the request
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
  }

  // Update other fields in the user document
  const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "Your user details are updated",
    updateUser,
  });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new Error("User not found");
    }
    // console.log(req.body)
    const updateProfile = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: `Your user details are updated`,
      updateProfile,
      token: generateJWT(updateProfile.id),
    });
  } catch (error) {
    throw new Error("Error fetching in updating profile", error);
  }
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  // Delete the associated submissions
  await Submission.deleteMany({ user: user });

  // Soft delete the user
  user.status = "disable";
  await user.save();

  res.status(200).json({
    message: `User deleted ${req.params.id}`,
  });
});

// otp settings
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset OTP',
    text: `Your OTP for password reset is: ${otp}`,
  };
  await transporter.sendMail(mailOptions);
};

const generateOTP = () => {
  return crypto.randomBytes(3).toString('hex');
};

const requestReset = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Generate new OTP
  const otp = generateOTP();

  // Update user with new OTP and expiry
  user.resetOtp = otp;
  user.otpExpiry = Date.now() + 3600000;  // 1 hour in milliseconds

  // Save the updated user
  // await user.save();
  await user.updateOne({ resetOtp: otp, otpExpiry: user.otpExpiry });

  await sendOTPEmail(email, otp);

  res.status(200).json({ message: `OTP sent to email` });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, password } = req.body;
  const user = await User.findOne({ email });

  if (user.resetOtp !== otp || user.otpExpiry < Date.now()) {
    res.status(400);
    throw new Error("Invalid or expired OTP");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  user.password = hashedPassword;
  user.resetOtp = undefined;
  user.otpExpiry = undefined;
  await user.updateOne({ resetOtp: otp, otpExpiry: user.otpExpiry , password:user.password});

  res.status(200).json({ message: "Password reset successful" });
});

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  updateUserProfile,
  deleteUser,
  resetPassword,
  requestReset,
};
