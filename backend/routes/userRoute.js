const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  updateUser,
  updateUserProfile,
  deleteUser,
  requestReset,
  resetPassword,
} = require("../controllers/userController");

router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", updateUserProfile);
// router.put('/profile/:id', updateUserProfile);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.post("/request-reset", requestReset);
router.post("/reset-password", resetPassword);

module.exports = router;
