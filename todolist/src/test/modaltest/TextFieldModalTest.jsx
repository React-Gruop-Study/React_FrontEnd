import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRef, useState } from 'react';
import { Button } from '@mui/material';
import Modal from 'common/modal/Modal';

const TextFieldModalTest = () => {
  const ref = useRef();

  const [modalHeader, setModalHeader] = useState();
  const [modalContent, setModalContent] = useState();
  const [modalRedirect, setModalRedirect] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const onClickRefTest = () => {
    setModalOpen(true);
    setModalHeader('알림');
    setModalContent('저장완료입니다.');
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <TextField
        id='outlined-basic'
        label='Outlined'
        variant='outlined'
        inputRef={ref}
      />
      <Button
        variant='outlined'
        onClick={onClickRefTest}
        style={{ width: '100px', height: '56px' }}
      >
        Test
      </Button>
      <Modal
        header={modalHeader}
        content={modalContent}
        modalState={modalOpen}
        returnLink='/'
        onClickModalClose={handleModalClose}
      />
    </Box>
  );
};

export default TextFieldModalTest;
