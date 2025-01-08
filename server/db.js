import mongoose, { mongo } from "mongoose";
const MONGODB_URL = process.env.MONGODBURL;
mongoose.connect(MONGODB_URL);

const codeDropSchema = new mongoose.Schema({
  code: String,
});

export const codeDropModel = mongoose.model("CodeDrop", codeDropSchema);
