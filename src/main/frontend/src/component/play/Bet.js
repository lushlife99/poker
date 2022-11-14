import React , {useState} from 'react';
import Wait3 from './Wait3';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Bet = (props) => {
    const navigate = useNavigate();
    const {turn,setTurn,fold,setFold} = props;
    return (
        <div>
            <button onClick={()=>
            {
                console.log('폴드!');
                props.setTurn(turn+1); //클릭시 turn값 증가 turn이 3이 되면 다음턴으로 넘어감
                props.setFold(fold+1); //1명제외 fold일시 게임종료를 위해
              // navigate("/wait"); //대기뷰
            }}>폴드</button>
            <button onClick={()=> {
                console.log('체크!');
                props.setTurn(turn+1); //클릭시 turn값 증가 turn이 3이 되면 다음턴으로 넘어감
               // navigate("/wait"); //대기뷰
            }}>체크</button>
            <button onClick={()=> {
                console.log('레이즈!');//선택할수 있게
                let money = prompt('금액 입력'); //레이즈 값 서버에 요청?
                console.log(money);
                props.setTurn(turn+1); //클릭시 turn값 증가 turn이 3이 되면 다음턴으로 넘어감
               // navigate("/wait"); //대기뷰
            }}>레이즈</button>

        </div>
    );
};

export default Bet;