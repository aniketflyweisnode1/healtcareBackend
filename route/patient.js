import express from "express";
import { verifyToken } from "../middelware/verifyToken";
import { patientSignupOrLogin, updatePatientDetails, verifyOtp } from "../controller/patient";

const router = express.Router();

// router.use((req, res, next) => {
//     if (req.path !== '/login') {
//         verifyToken(req, res, next);
//     } else {
//         next();
//     }
// });

// router.post('/login', loginOrRegister);
router.post("/verify", verifyOtp);
// router.post('/resend', resendOtp);
// router.post('/register',register)
router.post("/patient", patientSignupOrLogin);
router.post('/updatedetails',updatePatientDetails)

export default router;
