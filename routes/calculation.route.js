const express = require("express");
const { CalculationModel } = require("../model/CalculateModel");
const calculationRouter = express.Router();

calculationRouter.post("/calculate", async (req, res) => {
  try {
    const { annualInstalmentAmount, annualInterestRate, totalYears } = req.body;

    const i = annualInterestRate / 100;
    const n = totalYears;

    const totalInvestmentAmount = annualInstalmentAmount * totalYears;
    const totalMaturityValue =
      annualInstalmentAmount * (((1 + i) ** n - 1) / i);
    const totalInterestGained = totalMaturityValue - totalInvestmentAmount;

    const userId = req.userID;

    const calculation = await CalculationModel.create({
      user: userId,
      totalInvestmentAmount,
      totalInterestGained,
      totalMaturityValue,
    });

    res.json({
      message: "Calculation successful",
      calculation,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = { calculationRouter };
