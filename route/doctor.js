import express from "express";
import { login, searchByEmail, signup } from "../controller/doctor";


const router = express.Router()

// router.use((req, res, next) => {
//     if (req.path !== '/login') {
//         verifyToken(req, res, next);
//     } else {
//         next();
//     }
// });



router.post('/signup', signup)
router.post('/login',login)
router.get('/searchByEmail',searchByEmail)


export default router