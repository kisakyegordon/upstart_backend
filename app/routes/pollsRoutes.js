import express from "express";
import verifyToken from "../middleware/verifyAuth.js";
import { getPolls, getSinglePoll, createPoll } from "../controllers/pollsController.js"; 

const router = express.Router();

router.get("/polls/", getPolls);
router.get("/polls/:id", getSinglePoll);
router.post("/polls/create", createPoll);
// router.patch("/todos/:id", verifyToken, updateTodo);
// router.delete("/todos/:id", verifyToken, deleteTodo);

export default router;