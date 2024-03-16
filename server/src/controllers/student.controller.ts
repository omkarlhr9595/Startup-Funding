import httpStatus from "http-status";
import { Student } from "../models";
import catchAsync from "../utils/catchAsync";

const register = catchAsync(async (req, res) => {
  const { name, email, mobile, className, password, rollNo } = req.body;
  const existingStudent = await Student.findOne({
    email: email,
    rollNo: rollNo,
    mobile: mobile,
  });
  if (existingStudent) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "Student already exists",
    });
  }
  const student = new Student({
    name,
    email,
    mobile,
    className,
    password,
    rollNo,
  });
  await student.save();
  res.status(httpStatus.CREATED).json({
    message: "Student registered successfully",
  });
});
export default {
  register,
};
