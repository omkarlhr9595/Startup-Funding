import express from "express";
import validate from "../../middlewares/validate";
import { investorValidator } from "../../validators";
import { investorController } from "../../controllers";

const router = express.Router();

router.post(
  "/register",
  validate(investorValidator.registerInvestor),
  investorController.register
);

router.post(
  "/login",
  validate(investorValidator.loginInvestor),
  investorController.login
);

export default router;
