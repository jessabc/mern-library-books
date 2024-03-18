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
  successfullyReturnedAlertOpen: boolean,
  setSuccessfullyReturnedAlertOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SuccessfullyReturnedAlert({successfullyReturnedAlertOpen, setSuccessfullyReturnedAlertOpen}: Props) {

  const handleClose = (_e?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessfullyReturnedAlertOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={successfullyReturnedAlertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Book successfully returned! 
        </Alert>
      </Snackbar>
    </Stack>
  );
}


