import { makeStyles, Paper } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const ImgListViewer = () => {
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
                  <button type='button'>현재 글 수정하기</button>
                </div>
                <div>
                  <button type='button'>현재 글 삭제하기</button>
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
