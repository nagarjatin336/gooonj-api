const mongoose = require("mongoose");

const cardlessSchema = new mongoose.Schema({
    rid: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pin: String,
    time: { type: Date, default: Date.now },
    isValid: { type: Boolean, default: true },
});

module.exports = mongoose.model("Cardless", cardlessSchema);
