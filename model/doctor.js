import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    country: String,
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
