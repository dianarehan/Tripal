const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const walletSchema = new Schema(
    {
        userID: {
            type: Schema.Types.ObjectId,
            ref: "Tourist"
        },
        amount: {
            type: Number,
            required: true,
            default: 0.0

        },
        currency: {
            type: String,
            required: true,
            default: "EGP"
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Wallet", walletSchema);
