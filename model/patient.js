import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
    //   required: true,
      unique: true,
    },
    name: {
      type: String,
    //   required: true,
    },
    gender: {
      type: String,
    //   required: true,
    },
    dob: { type: Date },
    email: { type: String,  unique: true },
    otp: { type: String, required: false },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
