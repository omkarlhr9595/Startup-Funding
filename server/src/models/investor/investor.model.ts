import { Schema, model } from "mongoose";

interface IInvestor {
  name: string;
  email: string;
  mobile: string;
  password: string;
  address: string;
  experience: string;
  linkedin?: string;
}

const investorSchema = new Schema<IInvestor>({
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
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: false,
  },
});

const Investor = model<IInvestor>("Investor", investorSchema);
export default Investor;
