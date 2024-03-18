import express from "express";
import {
  createBook,
  deleteBook,
  editBook,
  getMembers,
  deleteMember,
  editMember,
} from "../controllers/adminControllers.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { upload } from "../middleware/upload.js";

export const router = express.Router();

router.use(requireAuth);

// create a book
// api/admin/
router.post("/", upload.single("cover"), createBook);

// edit a book
// api/admin/:id
router.patch("/:id", upload.single("cover"), editBook);

// delete a book
// api/admin/:id
router.delete("/:id", deleteBook);

// get members
// api/admin/members
router.get("/members", getMembers);

// delete a members
// api/admin/members/:id
router.delete("/members/:id", deleteMember);

// edit a members
// api/admin/members/:id
router.patch("/members/:id", editMember);
