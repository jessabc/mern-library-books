import express from "express";
import { getBooks } from "../controllers/booksControllers.js";

export const router = express.Router();

// get all books
// /api/books
router.get("/", getBooks);
