import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const MessageDialog = ({ title, message, open, setOpen }) => {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>
          <p>{message}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MessageDialog;