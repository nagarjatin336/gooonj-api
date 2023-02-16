const MachineModel = require("../models/machine");

exports.createMachine = async (req, res) => {
    const machine = new MachineModel(req.body);

    try {
        const dataToSave = await machine.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
