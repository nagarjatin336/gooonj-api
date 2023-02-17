const UserModel = require("../models/user");
const MachineModel = require("../models/machine");
const CashlessModel = require("../models/cardless");

const QUESTIONS = [
    "Do you have excess bleeding during menstruation?",
    "Do you feel like you have excess cramps?",
    "Do you have excess nausea or vomiting?",
    "Do you have excess blotting during menstruation?",
    "Do you have excess rashes and itching?",
];

exports.dispatchWithCard = async (req, res) => {
    const data = getWithdrawObject(req.body);

    try {
        const userDocument = await UserModel.findOne({
            gooonjId: req.body.gooonjId,
        });
        if (userDocument === null)
            res.status(400).json({
                message: "GooonjID not found",
                authenticated: false,
            });
        userDocument["withdraws"].push(data);
        userDocument.save();

        await MachineModel.findByIdAndUpdate(req.body.machineId, {
            $inc: { padsCount: -1 },
        });

        res.status(200).json({ message: "Records updates successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.dispatchWithCardless = async (req, res) => {
    const data = getWithdrawObject(req.body);

    try {
        const cashlessDoc = await CashlessModel.findOne({
            refId: req.body.refId,
        });
        if (cashlessDoc === null)
            res.status(400).json({
                message: "ReferenceID not found",
                authenticated: false,
            });
        const userDocument = await UserModel.findById(cashlessDoc.userId);
        userDocument["withdraws"].push(data);
        userDocument.save();

        await MachineModel.findByIdAndUpdate(req.body.machineId, {
            $inc: { padsCount: -1 },
        });

        res.status(200).json({ message: "Records updates successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

function getWithdrawObject(requestJSON) {
    return {
        machineId: requestJSON.machineId,
        questions: requestJSON.answers.map((answer, index) => {
            return { question: QUESTIONS[index], answer: answer };
        }),
    };
}
