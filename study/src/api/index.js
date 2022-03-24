import axios from "axios";

// 네이밍컨벤션으로 대체적으로 컴포넌트는 대문자로 시작하고 나머지는 소문자로시작한다.
export const getHelloWorld = async(sno) => {
    // try catch로 axios를 감싸면 정상적인 response를 받으면 리턴을 하고
    // 그렇지않으면 catch로 넘어간다.
    // 대신 받는곳에서도 async await로 받아야한다.
    // async await는 비동기를 동기적으로 처리할수 있도록 도와준다.
    try{
        const res = await axios.get('http://localhost:8080/helloworld/'+sno)
        return res.data
    }catch(e){
        alert(e)
    }finally{
        console.log('Finally 서비스로직을 구현하는부분')
    }
}
//나머지 api호출시 같은 방식으로 함수구현