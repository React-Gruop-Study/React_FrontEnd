import { makeStyles, Paper, Button, IconButton } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import BuildIcon from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';

const ImgListViewer = ({ onClick }) => {
  const dtoList = useSelector((state) => state.todo.dtoList);

  const returnDTOList = () => {
    return (
      dtoList && (
        <div>
          {dtoList.map((el) => (
            <Paper elevation={3} key={el.sno}>
              <div key={el.sno}>
                {el.sno}
                <div style={{ float: 'right' }}>
                  {el.regDate.substring(0, 10)}
                </div>
                <img src={el.imgDTOList[0].path} width='350' />
                <div> {el.text}</div>
                <div>
                  <Button type='button'>
                    수정하기
                    <BuildIcon />
                  </Button>
                  <Button type='button' onClick={() => onClick(el.sno)}>
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
