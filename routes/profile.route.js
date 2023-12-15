const express = require("express");
const { UserModel } = require("../model/UserModel");
const profileRouter = express.Router();

profileRouter.get("/profile", async (req, res) => {
  try {
    const user = await UserModel.findById(req.userID);
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const dateString = date.toISOString();
    res.json({ email: user.email, name: user.name, timestamp: dateString });
  } catch (error) {
    console.log(error);
  }
});

module.exports = { profileRouter };
