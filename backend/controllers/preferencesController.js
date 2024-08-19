const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Preference = require("../models/preferencesModel");

// Create preference for a user
const createPreference = asyncHandler(async (req, res) => {
  const { userId, ageRange, location, caste } = req.body;

  // Validate user existence
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Create preference
  const preference = new Preference({
    userId: userId,
    ageRange: ageRange,
    location: location,
    caste: caste,
    // Add other preference fields as needed
  });

  const savedPreference = await preference.save();
  res.status(201).json(savedPreference);
});

// Update preference for a user
const updatePreference = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { ageRange, location, caste } = req.body;

  // Validate user existence
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update preference
  const updatedPreference = await Preference.findOneAndUpdate(
    { userId: id },
    { $set: { ageRange, location, caste } },
    { new: true }
  );

  res.json(updatedPreference);
});

// Get preference for a user
const getPreference = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate user existence
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Get preference
  const preference = await Preference.findOne({ userId: id });
  if (!preference) {
    return res.status(404).json({ message: "Preference not found" });
  }

  res.json({msg:"showing", preference});
});

// Delete preference for a user
const deletePreference = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate user existence
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Delete preference
  await Preference.findOneAndDelete({ userId: id });

  res.json({ message: "Preference deleted" });
});

module.exports = {
  createPreference,
  updatePreference,
  getPreference,
  deletePreference,
};
