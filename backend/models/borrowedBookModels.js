import mongoose from "mongoose";

const Schema = mongoose.Schema;

const borrowedBookSchema = new Schema({
  bookID: { type: Schema.Types.ObjectId, ref: "Books" },
  userID: { type: Schema.Types.ObjectId, ref: "Users" },
  expireAt: { type: Date, expires: 120, default: Date.now },
});

export const BorrowedBooks = mongoose.model(
  "BorrowedBooks",
  borrowedBookSchema
);
