/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CmnModal = ({
  header,
  content,
  modalState,
  onClickModalClose,
  returnLink,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigator = useNavigate();
  useEffect(() => {
    setModalOpen(modalState);
  }, [modalState]);

  const linkToSomeWhere = () => {
    switch (returnLink) {
      case '0':
        return navigator(0);
      default:
        navigator(returnLink);
    }
  };

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={() => {
          onClickModalClose();
          linkToSomeWhere();
        }}
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {header}
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {content}
          </Typography>
          <Box mt={5} style={{ float: 'right' }}>
            <Button
              variant='outlined'
              onClick={() => {
                onClickModalClose();
                linkToSomeWhere();
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CmnModal;
