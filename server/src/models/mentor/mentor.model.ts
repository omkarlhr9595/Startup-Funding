import { Schema, model } from "mongoose";

interface IMentor {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

const mentorSchema = new Schema<IMentor>({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Mentor = model<IMentor>("Mentor", mentorSchema);
export default Mentor;
