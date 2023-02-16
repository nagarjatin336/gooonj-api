const mongoose = require("mongoose");

const withdrawSchema = new mongoose.Schema({
    machineId: { type: mongoose.Schema.Types.ObjectId, ref: "Machine" },
    time: { type: Date, default: Date.now },
    questions: [{ question: String, answer: Boolean }],
});

const userSchema = new mongoose.Schema({
    gooonjId: {
        type: String,
        lowercase: true,
    },
    name: String,
    number: String,
    dob: String,
    pin: String,
    address: String,
    withdraws: [withdrawSchema],
});

module.exports = mongoose.model("User", userSchema);
