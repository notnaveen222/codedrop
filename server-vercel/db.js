import mongoose, { mongo } from "mongoose";
//const MONGODB_URL = process.env.MONGODBURL;
mongoose.connect(
  "mongodb+srv://notnaveen2:HNPQx2348kocn8N6@cluster0.ncy9o.mongodb.net/codeDrop?retryWrites=true&w=majority&appName=Cluster0/codedrop"
);

const codeDropSchema = new mongoose.Schema({
  code: String,
});

export const codeDropModel = mongoose.model("CodeDrop", codeDropSchema);
