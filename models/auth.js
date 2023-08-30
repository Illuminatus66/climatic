import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  interactions: { type: Number, default: 5 },
  lastInteraction: { type: Date, default: Date.now },
});

export default mongoose.model("Climatic", userSchema);
