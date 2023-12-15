const mongoose = require("mongoose");
const { Schema } = mongoose;
const calculationSchema = mongoose.Schema({
  user: { type: Schema.Types.ObjectId },
  totalInvestmentAmount: Number,
  totalInterestGained: Number,
  totalMaturityValue: Number,
});

const CalculationModel = mongoose.model("Calculation", calculationSchema);

module.exports = { CalculationModel };
