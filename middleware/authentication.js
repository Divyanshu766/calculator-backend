const express = require("express");
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.json({ message: "Please Login First" });
  }
  jwt.verify(token, "secret", function (err, decoded) {
    if (err) {
      res.json({ message: "Please Login First" });
    }
    const userID = decoded.userID;
    req.userID = userID;
    next();
  });
};

module.exports = { authentication };
