const mongoose = require("mongoose");
mongoose.set('strictQuery', true)

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, "message cannot be blank"],
    },
  },
  { minimize: false, timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
