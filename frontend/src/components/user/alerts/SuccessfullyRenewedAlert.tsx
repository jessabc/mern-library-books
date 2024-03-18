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
  successfullyRenewedAlertOpen: boolean,
  setSuccessfullyRenewedAlertOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SuccessfullyRenewedAlert({successfullyRenewedAlertOpen, setSuccessfullyRenewedAlertOpen}: Props) {

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessfullyRenewedAlertOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={successfullyRenewedAlertOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Book successfully renewed! 
        </Alert>
      </Snackbar>
    </Stack>
  );
}

