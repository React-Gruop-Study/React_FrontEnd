import React from "react";

// viewer는 오직 view의 역할만 하는게 유지보수측면에서 더 나을수있다.
// 가공하는 로직이 들어가면 관리가 어려우니 한곳에 모아주는게 나을수도있다.
export const ResViewer = ({ value, text }) => {
    return (
        <div className="mainDiv">
            <h1>{value}</h1>
            <h1>{text}</h1>
        </div>
    );
}
 
export default ResViewer;

// console.log({...props})
// const snonum = Number(props.value)
// const [sno, setSno] = useState(snonum);
// const [text, setText] = useState('');


// useEffect(() => {
//     // asyncTest();
    
//     getFn()
//     //한번만 호출하고자 한다면 []를 꼭 붙여야한다.
// }, []);


// const dqs = document.querySelector.bind(document)

// function asyncTest() {
//     axios.get('http://localhost:8080/helloworld/1').
//         then((res) => {
//             if (res.data) {
//                 setSno(Number(res.data.sno));
//                 setText(res.data.text);
//             }
//         });
// }

// 리액트는 돔을 건드리면안된다.
// function expendHTML() {
//     asyncTest().then(res => {
//         const sno = res.data.sno
//         const text = res.data.text
//         dqs(".mainDiv").innerHTML += "<br>" + sno + "<br>"
//         dqs(".mainDiv").innerHTML += text
//         dqs("input[name=sno]").value = sno
//         dqs("input[name=text]").value = text
//     }).catch(e => {
//         alert(e.message)
//     })
// }