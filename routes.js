const express = require("express");
const router = express.Router();

const CashlessController = require("./controllers/cardlessController");
const DatabaseController = require("./controllers/databaseController");
const MachineController = require("./controllers/machineController");
const UserController = require("./controllers/userController");

router.get("/user/:id", UserController.getUser);
router.post("/createUser", UserController.createUser);
router.post("/verifyUser/card", UserController.verifyCardUser);

router.post("/createCardless", CashlessController.createCardless);
router.post("/verifyUser/cardless", CashlessController.verifyCardlessUser);

router.get("/machines", MachineController.getMachine);
router.post("/createMachine", MachineController.createMachine);

router.put("/dispatch/card", DatabaseController.dispatchWithCard);
router.put("/dispatch/cardless", DatabaseController.dispatchWithCardless);

module.exports = router;
