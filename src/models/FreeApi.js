const mongoose = require("mongoose");

const apiSchema = new mongoose.Schema({
  email: String,
  password: String,

  apiKey: String,

  freeTextCredits: {
    type: Number,
    default: 15,
  },

  freeImageCredits: {
    type: Number,
    default: 15,
  },

  paidCredits: {
    type: Number,
    default: 0,
  },

  totalUsage: {
    type: Number,
    default: 0,
  },
});

// module.exports = mongoose.model("User", userSchema);
const FreeApiAccess = mongoose.models.FreeApi || mongoose.model("FreeApi", apiSchema);

export default FreeApiAccess;
