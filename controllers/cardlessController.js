const CardlessModel = require("../models/cardless");

exports.createCardless = async (req, res) => {
    const cardless = new CardlessModel({
        refId: generateRandomNumberSequence(8),
        otp: generateRandomNumberSequence(4),
        userId: req.body.userId,
    });

    try {
        const document = await cardless.save();
        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.verifyCardlessUser = async (req, res) => {
    try {
        const data = await CardlessModel.findOne({ refId: req.body.refId });
        if (data === null)
            res.status(400).json({
                message: "Reference ID not found",
                authenticated: false,
            });
        else if (data["otp"] !== req.body.otp)
            res.status(400).json({
                message: "Incorrect OTP",
                authenticated: false,
            });
        else res.status(200).json({ authenticated: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

function generateRandomNumberSequence(length) {
    const digits = "0123456789";
    let result = "";
    for (let index = 0; index < length; index++) {
        result += digits[Math.floor(Math.random() * 10)];
    }
    return result;
}
