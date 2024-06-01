import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../model/admin";

export const signupAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    return res
      .status(201)
      .json({ message: "admin registered successfully", newAdmin });
  } catch (error) {
    console.error("Error registering admin:", error);
    return res.status(500).json({ message: "Error registering admin", error });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
        { id: admin._id, isAdmin: true },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in doctor:", error);
    return res.status(500).json({ message: "Error logging in admin", error });
  }
};
