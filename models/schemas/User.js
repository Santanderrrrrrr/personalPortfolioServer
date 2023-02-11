const mongoose = require("mongoose");
mongoose.set('strictQuery', true)
const { isEmail } = require("validator");
const ObjectID = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name cannot be blank"],
    },
    workplace: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "email can't be blank"],
      index: true,
      validate: [isEmail, "invalid email"],
    },
    message: [{
      type: ObjectID,
      required: true,
      ref: "Message",
    }],
  },
  { minimize: false, timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
