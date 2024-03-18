import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
  alradyBorrowedAlertOpen: boolean,
  setAlreadyBorrowedAlertOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export default function AlreadyBorrowedAlert({alradyBorrowedAlertOpen, setAlreadyBorrowedAlertOpen}: Props) {

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlreadyBorrowedAlertOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={alradyBorrowedAlertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          Cannot be borrowed as you already have this book on loan
        </Alert>
      </Snackbar>
    </Stack>
  );
}






