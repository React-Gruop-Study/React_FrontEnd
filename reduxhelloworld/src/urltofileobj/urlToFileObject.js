import { v4 as uuidv4 } from 'uuid';

export const convertURLtoFile = async (url) => {
  console.log(url);
  const response = await fetch(url);
  const data = await response.blob();
  const ext = url.split('/').pop(); // url 구조에 맞게 수정할 것
  const filename = uuidv4();
  const metadata = { type: `image/jpeg` };
  return new File([data], filename, metadata);
};
