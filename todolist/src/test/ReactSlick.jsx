/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ReactSlick = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
  };
  return (
    <div>
      <h2> Single Item</h2>
      <Slider {...settings}>
        <div>
          <img
            src='https://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.webp'
            width='375'
          />
        </div>
        <div>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/journey-study.appspot.com/o/다운로드-2022-04-11T13:46:21.800570600.jpg?alt=media'
            width='375'
          />
        </div>
        <div>
          <img
            src='https://firebasestorage.googleapis.com/v0/b/journey-study.appspot.com/o/%ED%85%8C%ED%81%AC%EC%8A%A4%ED%83%9D-001-2022-04-10T22%3A41%3A08.731793600.png?alt=media&token=d433651d-cc2f-4265-b015-99f453590f7a'
            width='375'
          />
        </div>
      </Slider>
    </div>
  );
};

export default ReactSlick;
