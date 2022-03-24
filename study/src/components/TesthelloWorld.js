import ResViewer from "./ResViewer"
import { useEffect, useRef, useState } from "react"
import React from 'react';
//폴더 하위에 파일의 이름이 index일시에 뒤 파일명은 생략가능
//폴더명이 파일명의 역할을 한다.
import { getHelloWorld } from './../api';

const TesthelloWorld = () => {
    const snoRef = useRef()

    const [sno, setSno] = useState(1);
    const [text, setText] = useState('');

    useEffect(() => {
        getFn(sno);
    }, []);

    const saveSnoFn = () => {
        // setSno(Number(snoRef.current.value));
        /*  */
        getFn(Number(snoRef.current.value));
    }

    // TestSlice에서 try catch를 했기 때문에 return이 object로 떨어져서
    // Promise기반이 아니다. 소스가 더 깔끔해진다.
    const getFn = async (snoNum) => {
        const res = await getHelloWorld(snoNum);
        if(res.sno === -1){ 
            alert("존재하지않는 sno입니다.")
            snoRef.current.value = ''
            return
        }
        console.log(res)
        setSno(Number(res.sno));
        setText(res.text);
        // .then(res => {
        //     if (res.data) {
        //         // setSno(Number(res.data.sno));
        //         // setText(res.data.text);
        //         setSno(Number(res.data.sno));
        //         setText(res.data.text);
        //     }
        // })
    }

    return ( 
        <div>
            {/**
             * useRef는 돔에 직접연결한다.
             * setState의 영향을 받지않는다.
             * input태그의 경우 ref 혹은 state 둘을 사용한다
             *  
            */}
            <h3>sno를 입력해주세요 : &nbsp;
                <input type='text' ref={snoRef}></input>
                <button onClick={saveSnoFn} >불러오기</button>
            </h3>
            <ResViewer value={sno} text={text}/>
        </div>
     );
}
 
export default TesthelloWorld;