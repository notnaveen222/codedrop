import express from "express";
import { codeDropModel } from "../../db.js";

export const generateRouter = express.Router();

generateRouter.post("/", async function (req, res) {
  const code = req.body.code;
  const data = await codeDropModel.create({
    code: code,
  });
  res.json({
    msg: "Gist Created Successfully",
    id: data._id,
  });
});
