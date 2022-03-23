import { useRef } from "react"
import React from 'react';
import { useDispatch } from "react-redux";
import { getHelloWorld } from "../api";


const TestInput = () => {

    const snoRef = useRef()
    const dispatch = useDispatch()

    const saveSnoFn = async() => {
        dispatch(getHelloWorld(Number(snoRef.current.value)));
    }

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