import express from "express";
import { userLogin, userSignup } from "../controllers/usersControllers.js";
import { requireAuth } from "../middleware/requireAuth.js";

export const router = express.Router();

// signup
// api/users/signup
router.post("/signup", userSignup);

// login
// api/users/login
router.post("/login", userLogin);
