import { Schema, model } from "mongoose";

interface IStudent {
  name: string;
  email: string;
  mobile: string;
  className: string;
  password: string;
  rollNo: string;
}

const studentSchema = new Schema<IStudent>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
  },
});

const Student = model<IStudent>("Student", studentSchema);

export default Student;
