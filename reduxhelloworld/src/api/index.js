import axios from 'axios';

// axios.create를 사용하여 인스턴스를 만들수있다.
// 더깔끔함, 중복되는 코드 방지, 초기설정가능(셋타임아웃 등)
const api = axios.create({
  baseURL: 'http://localhost:8080',

  // 타임아웃시 helloworldSlice catch로 넘어간다(rejectWithValue)
  timeout: 1000,
});

// createAsyncThunk는 리덕스전용이기떄문에 리덕스 이외에 api를 호출할때를 위하여
// thunk는 따로 slice로 분리했다.
// 비즈니스로직은 여기서 일어나지않고 api호출만한다.
export const getHelloWorld = async (sno) => {
  //
  // try{
  //     const res = await axios.get('http://localhost:8080/helloworld/'+sno)
  //     return res.data
  // }catch(e){
  //     alert(e)
  // }finally{
  //     console.log('Finally 서비스로직을 구현하는부분')
  // }
  const res = await api.get(`/helloworld/${sno}`);
  return res.data;
};
export const saveTodo = async (TestDTO) => {
  const res = await api.post(`/todo`, TestDTO, {
    headers: { 'Content-Type': `application/json` },
  });
  return res.data;
};
