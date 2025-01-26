import express from "express";
import { codeDropModel } from "../../db.js";

export const getRouter = express.Router();

getRouter.get("/:id", async function (req, res) {
  const customId = req.params.id;
  if (customId < 0) {
    //_id should be length 24, else run time err //updated to customId in V2
    res.json({
      msg: "Invalid Drop ID",
      code: null,
    });
  } else {
    const data = await codeDropModel.findOne({
      customId: customId,
    });
    if (data) {
      res.json({
        msg: "Gist Found",
        code: data.code,
      });
    } else {
      res.json({
        msg: "`No Code Found with that ID`",
        code: null,
      });
    }
  }
});
