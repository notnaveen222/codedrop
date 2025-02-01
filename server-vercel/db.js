import mongoose, { mongo } from "mongoose";
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL);

const codeDropSchema = new mongoose.Schema({
  customId: String,
  code: String,
});

export const codeDropModel = mongoose.model("CodeDrop", codeDropSchema);
