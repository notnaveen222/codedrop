import mongoose, { mongo } from "mongoose";

mongoose.connect(
  "mongodb+srv://notnaveen2:HNPQx2348kocn8N6@cluster0.ncy9o.mongodb.net/codeDrop?retryWrites=true&w=majority&appName=Cluster0/codedrop"
);

const codeDropSchema = new mongoose.Schema({
  id: Number,
  url: String,
  code: String,
});

export const codeDropModel = mongoose.model("CodeDrop", codeDropSchema);
