import express from "express";
import { studentController } from "../../controllers";
import validate from "../../middlewares/validate";
import { studentValidator } from "../../validators";

const router = express.Router();

router.post(
  "/register",
  validate(studentValidator.registerStudent),
  studentController.register
);

router.post(
  "/login",
  validate(studentValidator.loginStudent),
  studentController.login
);

export default router;
