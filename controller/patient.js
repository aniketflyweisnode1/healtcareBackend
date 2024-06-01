import Patient from "../model/patient";

import jwt from "jsonwebtoken";
import twilioClient from "../twilioClient";
import { sendEmail } from "../middelware/sendEmail";

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

//   export const patientSignup = async (req, res) => {
//     const { mobile,email,patiendId } = req.body;

//     try {
//       let patient = await Patient.findOne({ mobile,email,patiendId });

//       if (patient) {
//         return res
//           .status(400)
//           .json({ message: "Phone number already registered" });
//       }

//       const otp = generateOtp();
//       await twilioClient.messages.create({
//         body: `Your OTP for registration is: ${otp}`,
//         to: mobile,
//         from: process.env.TWILIO_PHONE_NUMBER,
//       });
//       await sendEmail(
//         process.env.EMAIL_USER,
//         email,
//         'OTP for Registration',
//         `Your OTP for registration is: ${otp}`
//     );
//       patient = new Patient({ mobile, otp });
//       await patient.save();

//       return res
//         .status(200)
//         .json({ message: "OTP sent successfully for registration" });
//     } catch (error) {
//       console.error("Error sending OTP for registration:", error);
//       return res
//         .status(500)
//         .json({ message: "Error sending OTP for registration", error });
//     }
//   };

//   export const patientLogin = async (req, res) => {
//     const { mobile,email,patiendId  } = req.body;

//     try {
//       const patient = await Patient.findOne({ mobile });

//       if (!patient) {
//         return res.status(400).json({ message: "Phone number not registered" });
//       }

//       const otp = generateOtp();
//       await twilioClient.messages.create({
//         body: `Your OTP for login is: ${otp}`,
//         to: mobile,
//         from: process.env.TWILIO_PHONE_NUMBER,
//       });

//       await sendEmail(
//         process.env.EMAIL_USER,
//         email,
//         'OTP for Login',
//         `Your OTP for login is: ${otp}`
//     );
//       patient.otp = otp;
//       await patient.save();
//       const token = jwt.sign({ id: patient.id }, "secretkey", {
//         expiresIn: "24h",
//       });

//       return res
//         .status(200)
//         .json({ message: "OTP sent successfully for login", token });
//     } catch (error) {
//       console.error("Error sending OTP for login:", error);
//       return res
//         .status(500)
//         .json({ message: "Error sending OTP for login", error });
//     }
//   };

export const patientSignupOrLogin = async (req, res) => {
    const { mobile, email, patientId } = req.body;
  
    try {
      let patient = await Patient.findOne({
        $or: [{ mobile }, { email }, { patientId }],
      });
  
      if (patient) {
        // Patient exists, send OTP for login
        const otp = generateOtp();
        // await twilioClient.messages.create({
        //   body: `Your OTP for login is: ${otp}`,
        //   to: mobile,
        //   from: process.env.TWILIO_PHONE_NUMBER,
        // });
  
        await sendEmail(
          process.env.EMAIL_USER,
          email,
          "OTP for Login",
          `Your OTP for login is: ${otp}`
        );
  
        patient.otp = otp;
        await patient.save();
        const token = jwt.sign({ id: patient.id }, "secretkey", {
          expiresIn: "24h",
        });
  
        return res
          .status(200)
          .json({ message: "OTP sent successfully for login", token });
      } else {
        // Patient doesn't exist, send OTP for registration
        const otp = generateOtp();
        // await twilioClient.messages.create({
        //   body: `Your OTP for registration is: ${otp}`,
        //   to: mobile,
        //   from: process.env.TWILIO_PHONE_NUMBER,
        // });
  
        await sendEmail(
          process.env.EMAIL_USER,
          email,
          "OTP for Registration",
          `Your OTP for registration is: ${otp}`
        );
  
        patient = new Patient({ mobile, email, patientId, otp });
        await patient.save();
  
        return res
          .status(200)
          .json({ message: "OTP sent successfully for registration" });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      return res.status(500).json({ message: "Error sending OTP", error });
    }
  };
  

  export const verifyOtp = async (req, res) => {
    const { mobile, email, patientId, otp } = req.body;
  
    try {
      let patient;
  
      if (mobile) {
        patient = await Patient.findOne({ mobile, otp });
      } else if (email) {
        patient = await Patient.findOne({ email, otp });
      } else if (patientId) {
        patient = await Patient.findOne({ patientId, otp });
      } else {
        return res.status(400).json({ message: "At least one of mobile, email, or patientId is required" });
      }
  
      if (!patient) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
  
      patient.otp = null;
      await patient.save();
  
      return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return res.status(500).json({ message: "Error verifying OTP", error });
    }
  };
  



  export const updatePatientDetails = async (req, res) => {
    const { id } = req.body; 
    const updateFields = req.body;
  
    try {
      const patient = await Patient.findByIdAndUpdate(id, updateFields, { new: true });
  
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
  
      return res.status(200).json({ message: 'Patient details updated successfully', patient });
    } catch (error) {
      console.error('Error updating patient details:', error);
      return res.status(500).json({ message: 'Error updating patient details', error });
    }
  };