import { useEffect, useState } from "react";
import useBooksContext from "../../hooks/useBooksContext";
import useGetBooks from "../../hooks/useGetBooks";
import BooksDataTable from "../../components/admin/BooksDataTable";
import SuccessfullyDeletedBookAlert from "../../components/admin/alerts/SuccessfullyDeletedBookAlert";
import SuccessfullyEditedBookAlert from "../../components/admin/alerts/SuccessfullyEditedBookAlert";

const AdminBooks = () => {
  const [
    successfullyDeletedBookAlertOpen,
    setSuccessfullyDeletedBookAlertOpen,
  ] = useState(false);
  const [successfullyEditedBookAlertOpen, setSuccessfullyEditedBookAlertOpen] =
    useState(false);

  const { books } = useBooksContext();
  const getBooks = useGetBooks();

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="m-2">
      <BooksDataTable
        books={books}
        setSuccessfullyDeletedBookAlertOpen={
          setSuccessfullyDeletedBookAlertOpen
        }
        setSuccessfullyEditedBookAlertOpen={setSuccessfullyEditedBookAlertOpen}
      />

      <SuccessfullyDeletedBookAlert
        successfullyDeletedBookAlertOpen={successfullyDeletedBookAlertOpen}
        setSuccessfullyDeletedBookAlertOpen={
          setSuccessfullyDeletedBookAlertOpen
        }
      />

      <SuccessfullyEditedBookAlert
        successfullyEditedBookAlertOpen={successfullyEditedBookAlertOpen}
        setSuccessfullyEditedBookAlertOpen={setSuccessfullyEditedBookAlertOpen}
      />
    </div>
  );
};

export default AdminBooks;
