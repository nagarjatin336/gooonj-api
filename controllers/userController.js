const UserModel = require("../models/user");

exports.createUser = async (req, res) => {
    const user = new UserModel({
        _id: req.body.rfid,
        name: req.body.name,
        number: req.body.number,
        dob: req.body.dob,
        pin: req.body.pin,
        address: req.body.address,
    });

    try {
        const document = await user.save();
        res.status(200).json(document);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.verifyCardUser = async (req, res) => {
    try {
        const data = await UserModel.findById(req.body.rfid.toLowerCase());
        if (data === null)
            res.status(400).json({
                message: "RFID not found",
                authenticated: false,
            });
        else if (data["pin"] !== req.body.pin)
            res.status(400).json({
                message: "Incorrect PIN",
                authenticated: false,
            });
        else res.status(200).json({ authenticated: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
