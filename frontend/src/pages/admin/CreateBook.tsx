import axios from "axios";
import { useState } from "react";
import useUserContext from "../../hooks/useUserContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SuccessfullyCreatedBookAlert from "../../components/admin/alerts/SuccessfullyCreatedBookAlert";

// credit https://preline.co/examples.html

type Form = {
  cover: string;
  coverFile: Blob | string;
  title: string;
  author: string;
  summary: string;
};

const CreateBook = () => {
  const [
    successfullyCreatedBookAlertOpen,
    setSuccessfullyCreatedBookAlertOpen,
  ] = useState(false);

  const [form, setForm] = useState<Form>({
    cover: "",
    coverFile: "",
    title: "",
    author: "",
    summary: "",
  });

  const { user } = useUserContext();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("cover", form.coverFile);
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("summary", form.summary);

    const headers = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      await axios.post("https://backend-url/api/admin", formData, headers);
      setSuccessfullyCreatedBookAlertOpen(true);
      setForm({
        cover: "",
        coverFile: "",
        title: "",
        author: "",
        summary: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.message);
      }
    }
  };

  return (
    <Box className="p-5 max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex flex-col gap-3"
      >
        <label className="block">
          <span className="sr-only">Choose profile photo</span>
          <input
            type="file"
            name="cover"
            hidden
            accept=".png, .jpg, .jpeg"
            onChange={handleCover}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-500 file:text-white
              hover:file:bg-blue-600
            "
          />
        </label>

        <TextField
          id="title"
          label="Title"
          variant="outlined"
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <TextField
          id="author"
          label="Author"
          variant="outlined"
          type="text"
          name="author"
          value={form.author}
          onChange={handleChange}
          required
        />

        <TextField
          id="summary"
          label="Summary"
          variant="outlined"
          type="text"
          // placeholder='summary'
          name="summary"
          value={form.summary}
          onChange={handleChange}
          required
          multiline
          rows={4}
        />

        <button
          type="submit"
          className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm "
        >
          Submit
        </button>
      </form>

      <SuccessfullyCreatedBookAlert
        successfullyCreatedBookAlertOpen={successfullyCreatedBookAlertOpen}
        setSuccessfullyCreatedBookAlertOpen={
          setSuccessfullyCreatedBookAlertOpen
        }
      />
    </Box>
  );
};

export default CreateBook;
