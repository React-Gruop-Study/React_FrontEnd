import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
  headers: { 'Content-Type': `application/json` },
});

export const getList = async (page) => {
  const res = await api.get(`/list`);
  return res.data;
};

export const getTextWithImg = async (sno) => {
  const res = await api.get(`/read/${sno}`);
  return res.data;
};

export const saveTodo = async ({ text, imgDTOList }) => {
  const res = await api.post(`/todo`, JSON.stringify({ text, imgDTOList }));
  return res.data;
};

export const modifyTodo = async ({ sno, text }) => {
  const res = await api.put(`/${sno}`, JSON.stringify({ sno, text }));
  return res.data;
};

export const deleteTodo = async (sno) => {
  const res = await api.delete(`/${sno}`);
  return res.data;
};
