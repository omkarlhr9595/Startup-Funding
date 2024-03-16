import express from "express";
import studentRoute from "./student.route";
import investorRoute from "./investor.route";

const router = express.Router();

router.use("/student", studentRoute);
router.use("/investor", investorRoute);

export default router;
