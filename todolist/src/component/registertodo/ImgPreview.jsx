/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { changeImgName } from 'store/todo/todoReducer';
import { Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const ImgPreview = ({ onChange }) => {
  const [src, setSrc] = useState([]);
  const [imgName, setImgName] = useState([]);
  const dispatch = useDispatch();
  const readMultipleImage = (input) => {
    if (input.target.files) {
      const fileArr = Array.from(input.target.files);
      fileArr.forEach((file) => {
        const reader = new FileReader();
        setImgName((prev) => [...prev, file.name]);
        reader.onload = (e) => {
          setSrc((prev) => [...prev, e.target.result]);
        };
        reader.readAsDataURL(file);
      });
      // eslint-disable-next-line no-param-reassign
      input.target.value = '';
    }
  };

  useEffect(() => {
    dispatch(changeImgName(imgName));
  }, [imgName]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
  };
  const imgList = () => {
    return (
      !!src.length && (
        <Slider {...settings}>
          {src.map((value, idx) => (
            <img key={uuidv4()} src={`${value}`} widthloading='lazy' alt='' />
          ))}
        </Slider>
      )
    );
  };

  return (
    <div>
      <div>
        <Button variant='outlined' component='label' style={{ height: '56px' }}>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => {
              onChange(e);
              readMultipleImage(e);
            }}
            multiple
          />
        </Button>
      </div>
      <div className='imgDiv'>{imgList()}</div>
    </div>
  );
};

export default ImgPreview;
