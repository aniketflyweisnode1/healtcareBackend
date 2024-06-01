import express from "express";
import {
  addTopic,
  deleteTopic,
  getAllTopicNames,
  getTopicDetails,
  updateTopic,
} from "../controller/topic";

const router = express.Router();

router.post("/addTopic", addTopic);
router.post("/updateTopic", updateTopic);
router.get("/getAllTopic", getAllTopicNames);
router.get("/getTopicDetails/:name", getTopicDetails);
router.delete('/deleteTopic/:id', deleteTopic);


export default router;
