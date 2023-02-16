const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    name: String,
    area: String,
    city: String,
    padsCount: { type: Number, min: 0, max: 40, default: 40 },
});

module.exports = mongoose.model("Machine", machineSchema);
