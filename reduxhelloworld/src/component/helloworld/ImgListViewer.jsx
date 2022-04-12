import { makeStyles, Paper, Button, IconButton } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BuildIcon from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';
import { thunkDeleteTodo } from 'store/helloworld/helloworldSlice';

const ImgListViewer = ({ onClick }) => {
  const dtoList = useSelector((state) => state.todo.dtoList);

  const dispatch = useDispatch();

  const deleteSnoFn = async (sno) => {
    await dispatch(thunkDeleteTodo(Number(sno))).then(() => {
      window.location.replace('/');
    });
  };
  const returnDTOList = () => {
    return (
      dtoList && (
        <div>
          {dtoList.map((res) => (
            <Paper elevation={3} key={res.sno}>
              <div key={res.sno}>
                {res.sno}
                <div style={{ float: 'right' }}>
                  {res.regDate.substring(0, 10)}
                </div>
                <img src={res.imgDTOList[0].path} width='350' />
                <div> {res.text}</div>
                <div>
                  <Button type='button' onClick={() => onClick(res.sno)}>
                    수정하기
                    <BuildIcon />
                  </Button>
                  <Button type='button' onClick={() => deleteSnoFn(res.sno)}>
                    <DeleteIcon />
                  </Button>
                  {/* <Button type='button' onClick={() => modifySnoFn(res.sno)}>
                    수정하기
                    <BuildIcon />
                  </Button>
                  <Button type='button' onClick={() => deleteSnoFn(res.sno)}>
                    <DeleteIcon />
                  </Button> */}
                </div>
              </div>
            </Paper>
          ))}
        </div>
      )
    );
  };

  return <div>{returnDTOList()}</div>;
};

export default ImgListViewer;
