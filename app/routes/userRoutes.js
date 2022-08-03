import express from "express";

import { createUser, signinUser } from "../controllers/usersController.js";
import verifyAuth from "../middleware/verifyAuth.js";

const router = express.Router();
  
// user routes 
router.post("/users/signup", createUser);
router.post("/users/signin", signinUser);

export default router;