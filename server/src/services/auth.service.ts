import { Student } from "../models";
import { encryptPassword, isPasswordMatch } from "../utils/encryption";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../config/config";

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

export default {
  registerStudent,
  loginStudent,
  generateAuthToken,
};
