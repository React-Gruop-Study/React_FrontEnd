import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRef, useState } from 'react';
import { Button } from '@mui/material';
import ModalTest from './ModalTest';

const TextFieldTest = () => {
  const ref = useRef();

  const [modalOpen, setModalOpen] = useState(false);
  const onClickRefTest = () => {
    console.log(ref.current.value);
    setModalOpen(true);
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
      <ModalTest
        header='안녕하세요'
        content='알림입니다 저장되었다라나..'
        modalState={modalOpen}
        returnLink='/'
        onClickModalClose={handleModalClose}
      />
    </Box>
  );
};

export default TextFieldTest;
