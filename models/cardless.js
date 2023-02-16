const mongoose = require("mongoose");

const cardlessSchema = new mongoose.Schema({
    refId: String,
    otp: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    time: { type: Date, default: Date.now },
    isValid: { type: Boolean, default: true },
});

module.exports = mongoose.model("Cardless", cardlessSchema);
