import express from "express";
import { loginAdmin, signupAdmin } from "../controller/admin";

const router = express.Router();

// router.use((req, res, next) => {
//     if (req.path !== '/login') {
//         verifyToken(req, res, next);
//     } else {
//         next();
//     }
// });

// router.post('/signup', signup)
// router.post('/login',login)
router.post("/signupAdmin", signupAdmin);

router.post("/loginAdmin", loginAdmin);

export default router;
