import { Books } from "../models/booksModels.js";
import { Users } from "../models/userModels.js";

// create a book
// api/admin/
export const createBook = async (req, res) => {
  const { title, author, summary } = req.body;
  const cover = req.file ? req.file.filename : "no cover";

  try {
    const book = await Books.create({ title, author, summary, cover });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// edit a book
// api/admin/:id
export const editBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, summary } = req.body;
  const cover = req.file ? req.file.filename : "no cover";

  try {
    const editBook = await Books.findByIdAndUpdate(
      id,
      { title, author, summary, cover },
      { returnDocument: "after" }
    );
    res.status(200).json(editBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a book
// api/admin/:id
export const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteBook = await Books.findByIdAndDelete(id);
    res.status(200).json(deleteBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get members
// api/admin/members
export const getMembers = async (req, res) => {
  try {
    const allUsers = await Users.find({});
    const members = allUsers.filter((user) => user.isAdmin === false);
    res.status(200).json(members);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a member
// api/admin/members/:id
export const deleteMember = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteMember = await Users.findByIdAndDelete(id);
    res.status(200).json(deleteMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// edit a members
// api/admin/members/:id
export const editMember = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const editMember = await Users.findByIdAndUpdate(
      id,
      { email },
      { returnDocument: "after" }
    );
    res.status(200).json(editMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
