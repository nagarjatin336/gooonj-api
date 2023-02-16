const express = require("express");
const router = express.Router();

const UserController = require("./controllers/userController");
const MachineController = require("./controllers/machineController");
const CashlessController = require("./controllers/cardlessController");

router.post("/createUser", UserController.createUser);
router.post("/verifyUser/card", UserController.verifyCardUser);

router.post("/verifyUser/cardless", CashlessController.verifyCardlessUser);
router.post("/createCardless", CashlessController.createCardless);

router.post("/createMachine", MachineController.createMachine);

module.exports = router;
