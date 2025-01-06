import express from "express";
import { codeDropModel } from "../../db.js";

export const getRouter = express.Router();

getRouter.get("/:id", async function (req, res) {
  const id = req.params.id;
  const data = await codeDropModel.findOne({
    _id: id,
  });
  if (data) {
    res.json({
      msg: "Gist Found",
      code: data.code,
    });
  } else {
    res.json({
      msg: "No Gist Found with that ID",
      code: null,
    });
  }
});
