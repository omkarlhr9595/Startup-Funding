import httpStatus from "http-status";
import authService from "../services/auth.service";
import catchAsync from "../utils/catchAsync";

const register = catchAsync(async (req, res) => {
  const { name, email, mobile, password, address, experience, linkedin } =
    req.body;
  await authService.registerInvestor({
    name,
    email,
    mobile,
    password,
    address,
    experience,
    linkedin,
  });

  res.status(httpStatus.CREATED).json({
    status: "success",
    message: "Investor registered successfully",
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const investor = await authService.loginInvestor(email, password);
  const token = await authService.generateAuthToken({
    _id: investor._id,
    role: "investor",
  });

  res.status(httpStatus.OK).json({
    status: "success",
    data: investor,
    token,
  });
});

export default {
  register,
  login,
};
