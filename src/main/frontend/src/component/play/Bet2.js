import React , {useState} from 'react';
import Wait3 from './Wait3';
import { useNavigate } from "react-router-dom";

const Bet2 = (props) => {
    const navigate = useNavigate();
    const {turn,setTurn,fold,setFold} = props;
    return (
        <div>
            <button onClick={()=>
            {
                console.log('폴드!');  //폴드 클릭시 비활성화 하게 해야함(미구현)
                props.setTurn(turn+1);
                props.setFold(fold+1); //1명제외 fold일시 게임종료를 위해
                // navigate("/wait"); //대기 뷰
            }}>체크</button>


        </div>
    );
};

export default Bet2;