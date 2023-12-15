const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.router");
const cors = require("cors");
const { profileRouter } = require("./routes/profile.route");
const { calculationRouter } = require("./routes/calculation.route");
const { authentication } = require("./middleware/authentication");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/user", userRouter);
app.use(authentication);
app.use("/", profileRouter);
app.use("/", calculationRouter);
app.get("/", (req, res) => {
  res.json({ message: "HELLO" });
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("DB connected and Server is running on 8080");
  } catch (error) {
    console.log(error);
  }
});
