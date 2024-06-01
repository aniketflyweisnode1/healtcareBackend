import express from "express";

import {
  addServices,
  getServicesList,
  servicesGetbyId,
  servicesdeleteById,
  updateServicesDetails,
} from "../controller/services";

const router = express.Router();

router.post("/addServices", addServices);

router.get("/getServicesList", getServicesList);
router.get("/servicesGetbyId/:id", servicesGetbyId);
router.post("/updateServicesDetails", updateServicesDetails);
router.post("/deleteservices/:id", servicesdeleteById);
export default router;
