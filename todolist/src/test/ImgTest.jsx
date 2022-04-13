import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { convertURLtoFile } from 'test/urltofileobj/urlToFileObject';
import { getStorage, ref, uploadBytesResumable } from '@firebase/storage';
import { initialize } from 'config/firebaseInit';

const ImgTest = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const storage = getStorage(initialize);
  const handleFileOnChange = async (e) => {
    // eslint-disable-next-line no-shadow
    const file = e.target.files[0]; // 입력받은 file객체

    // 이미지 resize 옵션 설정 (최대 width을 1024px로 지정)
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 400,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      setFile(compressedFile);

      // resize된 이미지의 url을 받아 fileUrl에 저장
      const promise = imageCompression.getDataUrlFromFile(compressedFile);
      promise.then((result) => {
        setFileUrl(result);
        // console.log(result);
        convertURLtoFile(result).then((res) => {
          console.log(res);
          const storageRef = ref(storage, '11123123');
          const uploadTask = uploadBytesResumable(storageRef, res);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <input
        type='file'
        accept='image/*'
        id='profile_img_upload'
        onChange={handleFileOnChange}
      />
      {fileUrl && (
        <>
          <div>
            <a href={fileUrl} download='안녕하세요'>
              압축된 이미지 다운로드
            </a>
          </div>
          <div>
            <img
              className='top_bar_profile_img'
              src={fileUrl}
              alt='profile_img'
              style={{ width: '375px' }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ImgTest;
