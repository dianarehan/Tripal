const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hisTagTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
  },
  { timestamps: true }
);
const HistoricalTagType = mongoose.model("HistoricalTagType", hisTagTypeSchema);
module.exports = HistoricalTagType
