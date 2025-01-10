import express from "express";
import { codeDropModel } from "../../db.js";

export const generateRouter = express.Router();

generateRouter.post("/", async function (req, res) {
  //add check for pre-existing customid
  const code = req.body.code;
  const customId = req.body.customId;
  const existingId = await codeDropModel.findOne({
    customId: customId,
  });
  if (existingId) {
    res.json({
      msg: "Drop ID already exists, try a different one",
      dropCreatedStatus: false,
    });
  } else {
    try {
      const data = await codeDropModel.create({
        code: code,
        customId: customId,
      });
      res.json({
        msg: "Drop Created successfully, Use the url to get the code",
        id: data._id,
        dropCreatedStatus: true,
        customId: data.customId,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Error Creating Drop ID, Try again Later", //Diffrent from FrontEnd
        dropCreatedStatus: false,
      });
    }
  }
});
