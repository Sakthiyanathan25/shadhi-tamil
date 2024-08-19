const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  ageRange: {
    minAge: {
      type: Number,
      min: 18,
    },
    maxAge: {
      type: Number,
      max: 100,
    },
  },
  location: {
    type: [String],
  },
  caste: {
    type: [String],
  },
  // Add other preference fields as needed (e.g., religion, education, interests)
});

module.exports = mongoose.model("Preference", preferenceSchema);
