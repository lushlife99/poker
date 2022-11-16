import React , {useState} from 'react';
import Wait3 from './Wait3';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Bet = (props) => {
    const navigate = useNavigate();
    const {card,setCard} = props;
    //setCard(card.player[card.betPos].fold=2);
    const {a,setA} =useState(0);
    const foldClick = () => {
        setCard(card.player[card.betPos].fold+2);
        axios.put("http://localhost8080/api/board/foldBetting", {
            card:card
        }).then(function (response) {
            console.log("데이터 전송")
        })
    }
    return (
        <div>
            <button onClick={()=>
            {
                foldClick();
                navigate("/wait2"); //대기뷰
            }}>폴드</button>
            <button onClick={()=> {
                console.log('체크!');
                //클릭시 turn값 증가 turn이 3이 되면 다음턴으로 넘어감
                navigate("/wait2"); //대기뷰
            }}>체크</button>
            <button onClick={() => {
                console.log('레이즈!');//선택할수 있게
                let money = prompt('금액 입력'); //레이즈 값 서버에 요청
                navigate("/wait2"); //대기뷰
            }}>레이즈</button>


        </div>
    );
};

export default Bet;