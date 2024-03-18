import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const bookSchema = new Schema({
  cover: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});

export const Books = mongoose.model("Books", bookSchema);
