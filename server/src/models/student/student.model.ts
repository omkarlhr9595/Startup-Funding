import { Schema, model } from "mongoose";

interface IStudent {
  id: number;
  name: string;
  age: number;
  grade: number;
}

const studentSchema = new Schema<IStudent>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  grade: { type: Number, required: true },
});

export default model<IStudent>("Student", studentSchema);
