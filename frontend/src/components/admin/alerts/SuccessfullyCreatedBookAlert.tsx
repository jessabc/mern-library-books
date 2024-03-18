import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
  successfullyCreatedBookAlertOpen: boolean;
  setSuccessfullyCreatedBookAlertOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function SuccessfullyCreatedBookAlert({
  successfullyCreatedBookAlertOpen,
  setSuccessfullyCreatedBookAlertOpen,
}: Props) {
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessfullyCreatedBookAlertOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={successfullyCreatedBookAlertOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Book successfully created!
        </Alert>
      </Snackbar>
    </Stack>
  );
}
