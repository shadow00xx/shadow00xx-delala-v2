const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  text: { type: String, trim: true, required: [true, "text is required"] },
  createby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  prodect_id: { type: mongoose.Schema.Types.ObjectId, ref: "Prodects" },
}, { timestamps: true });
module.exports = mongoose.model("Comment", CommentSchema);