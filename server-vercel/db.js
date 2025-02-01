import mongoose, { mongo } from "mongoose";
const MONGO_URL = process.env.MONGO_URL;
// mongoose.connect(
//   "mongodb+srv://notnaveen2:HNPQx2348kocn8N6@cluster0.ncy9o.mongodb.net/codeDrop?retryWrites=true&w=majority&appName=Cluster0/codedrop"
// );
mongoose.connect(MONGO_URL);

const codeDropSchema = new mongoose.Schema({
  customId: String,
  code: String,
});

export const codeDropModel = mongoose.model("CodeDrop", codeDropSchema);
