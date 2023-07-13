const { model, Schema } = require("mongoose");

const swappingSchema = new Schema(
  {
    walletAddress: { type: String },
    txnHashWStor: { type: String },
    txnHashStor: { type: String },
    txnAmount: { type: Number },
    status: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
    conversionType: {
      type: String,
    },
  },

  { timestamps: true }
);

const Swapping = model("Swapping", swappingSchema);
module.exports = Swapping;
