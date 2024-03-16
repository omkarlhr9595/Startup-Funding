import { Student } from "../models";
import { encryptPassword, isPasswordMatch } from "../utils/encryption";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../config/config";

const registerStudent = async ({
  name,
  email,
  mobile,
  className,
  password,
  rollNo,
}) => {
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

const loginStudent = async ({ email, password }) => {
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
  return {
    name: student.name,
    email: student.email,
    mobile: student.mobile,
    className: student.className,
    rollNo: student.rollNo,
  };
};

const generateAuthToken = async (student) => {
  const token = jwt.sign(
    {
      _id: student._id,
      role: "student",
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
