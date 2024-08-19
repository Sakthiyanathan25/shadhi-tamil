const express = require("express");
const router = express.Router();

const {
  createPreference,
  updatePreference,
  getPreference,
  deletePreference,
} = require("../controllers/preferencesController");

router.get("/:id", getPreference);
router.post("/create", createPreference);
router.put("/:id", updatePreference);
router.delete("/:id", deletePreference);


module.exports = router;
