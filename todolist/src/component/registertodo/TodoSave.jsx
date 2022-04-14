import { TextField, Button, Box } from '@mui/material';
import React, { forwardRef } from 'react';

const TodoSave = forwardRef(({ onClick }, refFn) => {
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
        label='텍스트를 입력해주세요'
        variant='outlined'
        inputRef={refFn}
      />
      <Button
        variant='outlined'
        onClick={onClick}
        style={{ width: '100px', height: '56px' }}
      >
        저장하기
      </Button>
    </Box>
  );
});

export default TodoSave;
