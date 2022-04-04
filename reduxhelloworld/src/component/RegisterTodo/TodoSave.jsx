import React, { forwardRef, useEffect, useState } from 'react';

const TodoSave = forwardRef(({ onClick }, refFn) => {
  const [src, setSrc] = useState();
  const srcList = [];
  const readMultipleImage = (input) => {
    if (input.target.files) {
      const fileArr = Array.from(input.target.files);
      console.log(fileArr);
      fileArr.forEach((file) => {
        const reader = new FileReader();
        console.log(file.name);
        console.log(reader);
        reader.onload = (e) => {
          srcList.push(e.target.result);
          setSrc(srcList);
          // setSrc(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  };
  // eslint-disable-next-line consistent-return
  // const imgList = () => {
  //   if (src !== undefined) {
  //     src.map((res) => {
  //       console.log(res);
  //       return <img src={res} width='550px' height='350px' />;
  //     });
  //   }
  // };
  // eslint-disable-next-line consistent-return
  const imgList = () => {
    console.log(src);
    if (src !== undefined) {
      return (
        <div>
          <img src={src[0]} width='550px' height='350px' />
          <img src={src[1]} width='550px' height='350px' />
          <img src={src[2]} width='550px' height='350px' />
        </div>
      );
    }
  };
  return (
    <div>
      <input type='text' ref={refFn} />
      <div>
        <input type='file' onChange={readMultipleImage} multiple />
      </div>
      <button type='button' onClick={onClick}>
        저장하기
      </button>
      <div className='imgDiv'>{imgList()}</div>
    </div>
  );
});

export default TodoSave;
