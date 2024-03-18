import * as Dialog from "@radix-ui/react-dialog";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import TextField from "@mui/material/TextField";

// credit https://preline.co/examples.html

type Form = {
  email: string;
};

interface Props {
  form: Form;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  editMember: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  editModalOpen: boolean;
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditMemberModal = ({
  form,
  handleChange,
  editMember,
  editModalOpen,
  setEditModalOpen,
}: Props) => (
  <Dialog.Root open={editModalOpen} onOpenChange={setEditModalOpen}>
    <Dialog.Trigger asChild>
      <EditNoteOutlinedIcon />
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium mb-3">
          Edit Member
        </Dialog.Title>

        <div>
          <form onSubmit={editMember} className="flex flex-col gap-3">
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <div className="mt-[25px] flex justify-end">
              <button
                type="submit"
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm focus:ring-offset-gray-800"
              >
                Submit
              </button>

              <Dialog.Close>
                <button
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-white text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all text-sm"
                  type="button"
                >
                  Cancel
                </button>
              </Dialog.Close>
            </div>
          </form>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default EditMemberModal;
