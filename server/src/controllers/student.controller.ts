import httpStatus from "http-status";
import authService from "../services/auth.service";
import catchAsync from "../utils/catchAsync";

const register = catchAsync(async (req, res) => {
  const { name, email, mobile, className, password, rollNo } = req.body;
  await authService.registerStudent({
    name,
    email,
    mobile,
    className,
    password,
    rollNo,
  });

  res.status(httpStatus.CREATED).json({
    status: "success",
    message: "Student registered successfully",
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const student = await authService.loginStudent({ email, password });
  const token = await authService.generateAuthToken({
    _id: student._id,
    role: "student",
  });
  res.status(httpStatus.OK).json({
    status: "success",
    data: student,
    token,
  });
});

export default {
  register,
  login,
};
