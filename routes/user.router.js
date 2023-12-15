const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isPresent = await UserModel.findOne({ email });

    if (!isPresent) {
      bcrypt.hash(password, 8, async function (err, hash) {
        await UserModel.create({ name, email, password: hash });
        res.json({ message: "User is Successfully added" });
      });
    } else {
      res.json({ message: "User is already Present! please login" });
    }
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userIsPresent = await UserModel.findOne({ email });

    if (userIsPresent) {
      const passwordMatch = await bcrypt.compare(
        password,
        userIsPresent.password
      );

      if (passwordMatch) {
        const token = jwt.sign({ userID: userIsPresent._id }, "secret");
        return res.json({ message: "Login Successfully", token: token });
      } else {
        res.send("Wrong Password!!! Please try again");
      }
    } else {
      res.send("User not found! Please Signup first");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { userRouter };
