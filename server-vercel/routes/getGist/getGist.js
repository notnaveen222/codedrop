import express from "express";
import { codeDropModel } from "../../db.js";

export const getRouter = express.Router();

getRouter.get("/:id", async function (req, res) {
  const id = req.params.id;
  if (id.length != 24) {
    //_id should be length 24, else run time err
    res.json({
      msg: "Invalid Gist ID",
      code: null,
    });
  } else {
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
  }
});
