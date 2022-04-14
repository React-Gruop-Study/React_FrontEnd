import { makeStyles, Paper, Button, IconButton } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BuildIcon from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';
import { thunkDeleteTodo } from 'store/todo/todoAsyncthunk';

const ImgListViewer = ({ onClickLinkToModify, onClickDeleteSno }) => {
  const dtoList = useSelector((state) => state.todo.dtoList);

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
                <img src={res.imgDTOList[0].path} width='350' alt='' />
                <div> {res.text}</div>
                <div>
                  <Button
                    type='button'
                    onClick={() => onClickLinkToModify(res.sno)}
                  >
                    <BuildIcon />
                  </Button>
                  <Button
                    type='button'
                    onClick={() => onClickDeleteSno(res.sno)}
                  >
                    <DeleteIcon />
                  </Button>
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
