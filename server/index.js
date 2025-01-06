import mongoose from "mongoose";
import { codeDropModel } from "./db.js";
import express from "express";
import { generateRouter } from "./routes/generateGist/generateGist.js";
import { getRouter } from "./routes/getGist/getGist.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/generate", generateRouter);
app.use("/", getRouter);

app.get("/", function (req, res) {
  res.json({
    msg: "Code Drop API Home, redirecting to Generate Page",
  });
});

app.listen(4000);
