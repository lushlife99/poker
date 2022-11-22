import React , {useState,useEffect} from 'react';
import Wait3 from './Wait3';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Bet = (props) => {
    const navigate = useNavigate();
    const {data,setData} = props;
    const axiosConfig = {
        headers:{
            "Content-Type": "application/json"
        }
    }
    return (
        <div>
            <button onClick={()=>
            {
                axios.put('http://localhost:8080/api/board/foldBetting',{        // PUT
                    data: data,
                })
               // console.log(data.data);
                navigate("/wait2"); //대기뷰
            }}>폴드</button>
            <button onClick={()=> {
                console.log('체크!');
                //클릭시 turn값 증가 turn이 3이 되면 다음턴으로 넘어감
                navigate("/wait2"); //대기뷰
            }}>체크</button>
            <button onClick={() => {
                console.log('레이즈!');//선택할수 있게
                let money = prompt('금액 입력'); //레이즈 값 서버에 요청?
                navigate("/wait2"); //대기뷰
            }}>레이즈</button>
        </div>
    );
};
export default Bet;