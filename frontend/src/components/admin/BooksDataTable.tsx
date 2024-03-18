import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridTreeNode,
} from "@mui/x-data-grid";
import axios from "axios";
import useUserContext from "../../hooks/useUserContext";
import EditBookModal from "./modals/EditBookModal";
import DeleteBookModal from "./modals/DeleteBookModal";
import useBooksContext from "../../hooks/useBooksContext";
import { useState } from "react";
import { IBook } from "../../interfaces";

type Form = {
  cover: string;
  coverFile: Blob | string;
  title: string;
  author: string;
  summary: string;
};

interface Props {
  books: IBook[];
  setSuccessfullyDeletedBookAlertOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setSuccessfullyEditedBookAlertOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function BooksDataTable({
  books,
  setSuccessfullyDeletedBookAlertOpen,
  setSuccessfullyEditedBookAlertOpen,
}: Props) {
  const [deleteID, setDeleteID] = useState("");
  const [formID, setFormID] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [form, setForm] = useState<Form>({
    cover: "",
    coverFile: "",
    title: "",
    author: "",
    summary: "",
  });

  const { dispatch } = useBooksContext();
  const { user } = useUserContext();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "cover", headerName: "Cover", width: 70 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "author", headerName: "Author", width: 200 },
    { field: "summary", headerName: "Summary", width: 600, sortable: false },

    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      sortable: false,
      renderCell: () => {
        return (
          <button
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <EditBookModal
              handleChange={handleChange}
              editBook={(e) => editBook(e, formID)}
              form={form}
              handleCover={handleCover}
              editModalOpen={editModalOpen}
              setEditModalOpen={setEditModalOpen}
            />
          </button>
        );
      },
    },

    {
      field: "remove",
      headerName: "Remove",
      width: 100,
      sortable: false,
      renderCell: () => {
        return (
          <button
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <DeleteBookModal deleteBook={() => deleteBook(deleteID)} />
          </button>
        );
      },
    },
  ];

  const rows = books.map((book) => {
    return {
      id: book._id,
      cover: book.cover,
      title: book.title,
      author: book.author,
      summary: book.summary,
      edit: "edit",
      remove: "remove",
    };
  });

  const handleOnCellClick = (
    e: GridCellParams<any, unknown, unknown, GridTreeNode>
  ) => {
    if (!editModalOpen) {
      if (e.formattedValue === "edit") {
        setForm({
          cover: e.row.cover,
          coverFile: e.row.coverFile,
          title: e.row.title,
          author: e.row.author,
          summary: e.row.summary,
        });
        setFormID(e.id.toString());
      } else if (e.formattedValue === "remove") {
        setDeleteID(e.id.toString());
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return {
        ...prev,
        cover: e.target.files ? e.target.files[0].name.toString() : "",
        coverFile: e.target.files ? e.target.files[0] : "",
      };
    });
  };

  const headers = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const editBook = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("cover", form.coverFile);
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("summary", form.summary);
    try {
      const response = await axios.patch(
        `https://backend-url/api/admin/${id}`,
        formData,
        headers
      );
      dispatch({ type: "EDIT_BOOK", payload: response.data });
      setSuccessfullyEditedBookAlertOpen(true);
      setForm({
        cover: "",
        coverFile: "",
        title: "",
        author: "",
        summary: "",
      });
      setEditModalOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.message);
      }
    }
  };

  const deleteBook = async (id: string) => {
    try {
      const response = await axios.delete(
        `https://backend-url/api/admin/${id}`,
        headers
      );
      dispatch({ type: "DELETE_BOOK", payload: response.data });
      setSuccessfullyDeletedBookAlertOpen(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.message);
      }
    }
  };

  return (
    <div style={{ height: 400, width: "100%" }} className="mx-2 mt-5">
      <DataGrid
        rows={rows}
        columns={columns}
        onCellClick={(e) => handleOnCellClick(e)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
          columns: {
            columnVisibilityModel: {
              id: false,
              cover: false,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
