import * as Dialog from "@radix-ui/react-dialog";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import TextField from "@mui/material/TextField";

// credit https://preline.co/examples.html

type Form = {
  cover: string;
  coverFile: Blob | string;
  title: string;
  author: string;
  summary: string;
};

interface Props {
  form: Form;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  editBook: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleCover: (event: React.ChangeEvent<HTMLInputElement>) => void;
  editModalOpen: boolean;
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditBookModal = ({
  form,
  handleChange,
  editBook,
  handleCover,
  editModalOpen,
  setEditModalOpen,
}: Props) => (
  <Dialog.Root open={editModalOpen} onOpenChange={setEditModalOpen}>
    <Dialog.Trigger asChild>
      <EditNoteOutlinedIcon />
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none overflow-auto">
        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium mb-3">
          Edit Book
        </Dialog.Title>
        <div>
          <form
            onSubmit={editBook}
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
              name="summary"
              value={form.summary}
              onChange={handleChange}
              required
              multiline
              rows={4}
            />

            <div className="mt-[25px] flex justify-end">
              <button
                type="submit"
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm focus:ring-offset-gray-800"
              >
                Submit
              </button>

              <Dialog.Close>
                <div className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-white text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all text-sm">
                  Cancel
                </div>
              </Dialog.Close>
            </div>
          </form>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default EditBookModal;
