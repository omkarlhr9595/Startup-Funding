import express from "express";
import studentRoute from "./student.route";

const router = express.Router();

router.use("/student", studentRoute);

export default router;

