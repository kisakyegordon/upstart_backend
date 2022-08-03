import express from "express";
import verifyToken from "../middleware/verifyAuth.js";
import { getTodos, getSingleTodo, createTodo, deleteTodo, updateTodo } from "../controllers/todosController.js"; 

const router = express.Router();

router.get("/todos/", verifyToken, getTodos);
router.get("/todos/:id", verifyToken, getSingleTodo);
router.post("/todos/create", verifyToken, createTodo);
router.patch("/todos/:id", verifyToken, updateTodo);
router.delete("/todos/:id", verifyToken, deleteTodo);

export default router;