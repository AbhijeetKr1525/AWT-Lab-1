import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  text: String,
  completed: Boolean
});

export default mongoose.model("Todo", todoSchema);
