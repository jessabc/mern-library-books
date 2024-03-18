import express from "express";
import {
  borrowBook,
  getLoans,
  returnBook,
  renewBook,
} from "../controllers/membersControllers.js";
import { requireAuth } from "../middleware/requireAuth.js";

export const router = express.Router();

router.use(requireAuth);

// borrow book
// api/members/
router.post("/", borrowBook);

// get loans
// api/members/loans
router.get("/loans", getLoans);

// return book
// api/members/loans/:id
router.delete("/loans/:id", returnBook);

// renew book
// api/members/loans/:id
router.patch("/loans/:id", renewBook);
