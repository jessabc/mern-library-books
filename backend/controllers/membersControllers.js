import { BorrowedBooks } from "../models/borrowedBookModels.js";

// borrow book
// api/members/
export const borrowBook = async (req, res) => {
  const bookID = req.body.bookID;
  const userID = req.user._id;

  try {
    const borrowed = await BorrowedBooks.create({ bookID, userID });
    const borrowedBook = await BorrowedBooks.findById(borrowed._id).populate(
      "bookID"
    );
    res.status(200).json(borrowedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get loans
// api/members/loans
export const getLoans = async (req, res) => {
  const userID = req.user._id;

  try {
    const currentLoans = await BorrowedBooks.find({ userID }).populate(
      "bookID"
    );
    console.log("current loans", currentLoans);
    res.status(200).json(currentLoans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// return a book
// api/members/loans/:id
export const returnBook = async (req, res) => {
  const bookID = req.params.id;
  const userID = req.user._id;

  try {
    const filter = await BorrowedBooks.findOneAndDelete({ _id: bookID });
    console.log(filter);
    res.status(200).json({ filter });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// renew book
// api/members/loans/:id
export const renewBook = async (req, res) => {
  const borrowedbookID = req.params.id;
  const userID = req.user._id;

  try {
    await BorrowedBooks.updateOne(
      { _id: borrowedbookID },
      { expireAt: Date.now() },
      { new: "true" }
    ).populate("bookID");
    const updated = await BorrowedBooks.findById(borrowedbookID).populate(
      "bookID"
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
