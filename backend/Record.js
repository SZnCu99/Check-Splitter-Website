const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Record = new Schema(
  {
    owner: String,
    date: Date,
    sharedBy: [String],
    transactions: [mongoose.ObjectId]
  }
)

module.exports = mongoose.model("Record", Record);