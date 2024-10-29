import React from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { Fade } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const ModalForm = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" gutterBottom>
            Add New Equipment
          </Typography>
          <form>
            <TextField
              margin="normal"
              fullWidth
              label="Name"
              variant="outlined"
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="Description"
              variant="outlined"
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="Status"
              variant="outlined"
              required
            />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalForm;
