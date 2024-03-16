import { Student } from "../models";
import { encryptPassword, isPasswordMatch } from "../utils/encryption";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../config/config";
import Investor from "../models/investor/investor.model";

interface IRegisterStudent {
  name: string;
  email: string;
  mobile: string;
  className: string;
  password: string;
  rollNo: string;
}

const registerStudent = async ({
  name,
  email,
  mobile,
  className,
  password,
  rollNo,
}: IRegisterStudent) => {
  const existingStudent = await Student.findOne({
    email: email,
    rollNo: rollNo,
    mobile: mobile,
  });
  if (existingStudent) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Student already exists");
  }
  const student = new Student({
    name,
    email,
    mobile,
    className,
    password: await encryptPassword(password),
    rollNo,
  });
  await student.save();
  return student;
};

interface ILoginStudent {
  email: string;
  password: string;
}

interface IStudentData {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  className: string;
  rollNo: string;
}

const loginStudent = async ({
  email,
  password,
}: ILoginStudent): Promise<IStudentData> => {
  const student = await Student.findOne({
    email,
  });
  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, "Student not found");
  }
  const isMatch = await isPasswordMatch(password, student.password);
  if (!isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
  }
  const studentData: IStudentData = {
    name: student.name,
    email: student.email,
    mobile: student.mobile,
    className: student.className,
    rollNo: student.rollNo,
    _id: student._id.toString(),
  };
  return studentData;
};

interface IGenerateAuthToken {
  _id: string;
  role: string;
}

const generateAuthToken = async ({ _id, role }: IGenerateAuthToken) => {
  const token = jwt.sign(
    {
      _id: _id,
      role: role,
    },
    config.jwt.secret,
    {
      expiresIn: config.jwt.refreshExpirationDays + "d",
    }
  );
  return token;
};

interface IRegisterInvestor {
  name: string;
  email: string;
  mobile: string;
  password: string;
  address: string;
  experience: string;
  linkedin?: string;
}

const registerInvestor = async ({
  name,
  email,
  mobile,
  password,
  address,
  experience,
  linkedin,
}: IRegisterInvestor) => {
  const existingInvestor = await Investor.findOne({
    email: email,
    mobile: mobile,
  });
  if (existingInvestor) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Investor already exists");
  }
  const investor = new Investor({
    name,
    email,
    mobile,
    password: await encryptPassword(password),
    address,
    experience,
    linkedin,
  });
  await investor.save();
  return investor;
};

interface IInvestorData {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  experience: string;
  linkedin?: string;
}

const loginInvestor = async (
  email: string,
  password: string
): Promise<IInvestorData> => {
  const investor = await Investor.findOne({
    email,
  });
  if (!investor) {
    throw new ApiError(httpStatus.NOT_FOUND, "Investor not found");
  }
  const isMatch = await isPasswordMatch(password, investor.password);
  if (!isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
  }
  const investorData: IInvestorData = {
    name: investor.name,
    email: investor.email,
    mobile: investor.mobile,
    address: investor.address,
    experience: investor.experience,
    _id: investor._id.toString(),
  };
  return investorData;
};

export default {
  registerStudent,
  loginStudent,
  generateAuthToken,
  registerInvestor,
  loginInvestor,
};
