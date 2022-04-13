/* eslint-disable react/jsx-props-no-spreading */
import { ImageList, ImageListItem, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeImgName } from 'store/helloworld/helloworldSlice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
            <img src={`${value}`} widthloading='lazy' />
          ))}
        </Slider>
      )
    );
  };

  return (
    <div>
      <div>
        <input
          type='file'
          accept='image/*'
          onChange={(e) => {
            onChange(e);
            readMultipleImage(e);
          }}
          multiple
        />
      </div>
      <div className='imgDiv'>{imgList()}</div>
    </div>
  );
};

export default ImgPreview;
