const UserModel = require("../models/user");

exports.getUser = async (req, res) => {
    try {
        const document = await UserModel.findById(req.params.id);
        res.json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    const user = new UserModel(req.body);

    try {
        const document = await user.save();
        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.verifyCardUser = async (req, res) => {
    try {
        const data = await UserModel.findOne({ gooonjId: req.body.gooonjId });
        if (data === null)
            res.status(400).json({
                message: "GooonjID not found",
                authenticated: false,
            });
        else if (data["pin"] !== req.body.pin)
            res.status(400).json({
                message: "Incorrect PIN",
                authenticated: false,
            });
        else res.status(200).json({ authenticated: true, userId: data["id"] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
