import { useEffect } from "react";
import useGetBooks from "../../hooks/useGetBooks";
import useBooksContext from "../../hooks/useBooksContext";
import LibraryBook from "../../components/user/LibraryBook";
import useQueryContext from "../../hooks/useQueryContext";

const UserHome = () => {
  const getBooks = useGetBooks();

  const { books } = useBooksContext();
  const { query } = useQueryContext();

  const filtered = books.filter(
    (book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    getBooks();
  }, []);

  const bookElements = filtered.map((book) => <LibraryBook book={book} />);

  return (
    <div className="grid md:grid-cols-2 gap-2 mx-5 my-5">{bookElements}</div>
  );
};

export default UserHome;
