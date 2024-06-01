// controllers/doctorController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Doctor from "../model/doctor";

export const signup = async (req, res) => {
  const { email, password, country } = req.body;

  try {
    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new Doctor({
      email,
      password: hashedPassword,
      country,
    });

    await newDoctor.save();

    return res
      .status(201)
      .json({ message: "Doctor registered successfully", newDoctor });
  } catch (error) {
    console.error("Error registering doctor:", error);
    return res.status(500).json({ message: "Error registering doctor", error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in doctor:", error);
    return res.status(500).json({ message: "Error logging in doctor", error });
  }
};




export const searchByEmail = async (req, res) => {
  const { email } = req.query;

  try {
    let doctors;
    if (email) {
      doctors = await Doctor.find({ email: email });
    } else {
      doctors = await Doctor.find();
    }

    res.status(200).json({
      message: "Doctor list fetched successfully",
      statusCode: 200,
      data: doctors,
    });
  } catch (error) {
    console.error("Error fetching doctor:", error);

    res.status(500).json({
      message: "Error in fetching doctor",
      error: error.message,
      statusCode: 500,
    });
  }
};



