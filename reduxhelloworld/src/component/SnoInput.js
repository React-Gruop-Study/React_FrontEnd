import { useEffect, useRef } from "react"
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getHelloWorld } from "../api";


const TestInput = () => {

    const snoRef = useRef()
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getHelloWorld(1));
    // }, []);

    const saveSnoFn = async() => {
        dispatch(getHelloWorld(Number(snoRef.current.value)));
    }

    // if(res.sno === -1){ 
    //     alert("존재하지않는 sno입니다.")
    //     snoRef.current.value = ''
    //     return
    // }
    

    return (
        <div>
            <h3>sno를 입력해주세요 : &nbsp;
                <input type='text' ref={snoRef}></input>
                <button onClick={saveSnoFn} >불러오기</button>
            </h3>
        </div> 
        
     );
}


 
export default TestInput;