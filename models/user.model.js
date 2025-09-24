const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "email id already exists!"],
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{VALUE} is not a valid email id!",
    },
    createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    createdAt: { type: Date, default: Date.now },
  },
  isVerified: {
    type: Boolean,
  },
});

const User = mongoose.model("users", schema);
module.exports = User;
