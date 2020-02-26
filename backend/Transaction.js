const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Transaction = new Schema(
  {
    owner: String,
    payer: String,
    amount: Number,
    sharedby: [String],
    displayShared: String,
    isresult: Boolean,
    comment: String
  }
)

module.exports = mongoose.model("Transaction", Transaction);