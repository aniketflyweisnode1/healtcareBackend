import express from "express";
import {
  addCategories,
  deleteById,
  getCategories,
  getbyId,
  updateCategoryDetails,
} from "../controller/categories";
import { verifyAdmin } from "../middelware/verifyToken";

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
router.post("/category", addCategories);

router.get("/categories", getCategories);
router.get('/getbyId/:id', getbyId);
router.post("/updateCategoryDetails", updateCategoryDetails);
router.post("/deletecategory/:id", deleteById);
export default router;
