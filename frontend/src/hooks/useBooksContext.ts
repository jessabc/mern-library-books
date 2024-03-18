import { useContext } from "react";
import { BooksContext } from "../context/BooksContext";

const useBooksContext = () => {
  const { state, dispatch } = useContext(BooksContext);
  const { books } = state;
  return { books, dispatch };
};

export default useBooksContext;
