import { Books } from "../models/booksModels.js";

// get all books
// /api/books
export const getBooks = async (req, res) => {
  try {
    const books = await Books.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
