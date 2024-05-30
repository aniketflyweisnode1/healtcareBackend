// import express from "express";
// import {  buyerLogin, buyerSignup, loginOrRegister, register, resendOtp, sendOtp, updateDetails, verifyOtp } from "../controller/buyer";
// import { verifyToken } from "../middelware/verifyToken";


// const router = express.Router()

// // router.use((req, res, next) => {
// //     if (req.path !== '/login') {
// //         verifyToken(req, res, next);
// //     } else {
// //         next();
// //     }
// // });


// // router.post('/login', loginOrRegister);
// router.post('/verify', verifyOtp);
// // router.post('/resend', resendOtp);
// // router.post('/register',register)
// router.post('/signup', buyerSignup)
// router.post('/login',buyerLogin)
// router.post('/addShop',updateDetails)


// export default router