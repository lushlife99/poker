import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import './Main.css';
import axios from 'axios';
const Main = () => {
    const id = 1;
    const [data, setData] = useState();
    const getData = async () => {
        const datas = await axios.put('https://jsonplaceholder.typicode.com/todos/1');//'http://localhost:8080/game/joinGame/1'
        console.log(datas.data.id);  //async await를 사용하여 데이터를 바로 뽑아낼수있음
        setData(datas);
    };
        return (

            <div className="background">
                <video className="mainVideo" src="/videos/card.mp4" muted autoPlay loop/>
                <div className="mainPage">
                    <Link to="/join">
                        <p>회원가입</p>
                    </Link>
                    <Link to="/login">
                        <p>로그인</p>
                    </Link>
                </div>
            </div>


        );

};

export default Main;