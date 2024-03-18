import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridTreeNode,
} from "@mui/x-data-grid";
import axios from "axios";
import useUserContext from "../../hooks/useUserContext";
import DeleteMemberModal from "./modals/DeleteMemberModal";
import { useState } from "react";
import EditMemberModal from "./modals/EditMemberModal";
import { IMember } from "../../interfaces";

interface Props {
  members: IMember[];
  setMembers: React.Dispatch<React.SetStateAction<IMember[]>>;
  setSuccessfullyDeletedMemberAlertOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setSuccessfullyEditedMemberAlertOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function MembersDataTable({
  members,
  setMembers,
  setSuccessfullyDeletedMemberAlertOpen,
  setSuccessfullyEditedMemberAlertOpen,
}: Props) {
  const [deleteID, setDeleteID] = useState("");
  const [formID, setFormID] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [form, setForm] = useState({
    email: "",
  });

  const { user } = useUserContext();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "email", headerName: "Email", width: 300 },
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
            <EditMemberModal
              handleChange={handleChange}
              editMember={(e) => editMember(e, formID)}
              form={form}
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
            <DeleteMemberModal deleteMember={() => deleteMember(deleteID)} />
          </button>
        );
      },
    },
  ];

  const rows = members.map((member) => {
    return {
      id: member._id,
      email: member.email,
      edit: "edit",
      remove: "remove",
    };
  });

  const handleOnCellClick = (
    e: GridCellParams<any, unknown, unknown, GridTreeNode>
  ) => {
    if (!editModalOpen) {
      console.log(e);
      if (e.formattedValue === "edit") {
        setForm({
          email: e.row.email,
        });
        setFormID(e.id.toString());
      } else if (e.formattedValue === "remove") {
        setDeleteID(e.id.toString());
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const headers = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const editMember = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `${process.env.BACKEND_URL}/api/admin/members/${id}`,
        form,
        headers
      );
      setMembers((prev) =>
        prev.map((member) =>
          member._id === id ? { ...member, email: response.data.email } : member
        )
      );
      setSuccessfullyEditedMemberAlertOpen(true);
      setForm({ email: "" });
      setEditModalOpen(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.message);
      }
    }
  };

  const deleteMember = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.BACKEND_URL}/api/admin/members/${id}`,
        headers
      );
      setMembers((prev) => prev.filter((member) => member._id != id));
      setSuccessfullyDeletedMemberAlertOpen(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.message);
      }
    }
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onCellClick={handleOnCellClick}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
