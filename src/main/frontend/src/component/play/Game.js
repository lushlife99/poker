import React, {useState,useEffect,} from 'react';
import { useNavigate } from "react-router-dom";
import './Game.css'
import axios from 'axios';
import Poker from './Poker';
import {Link} from "react-router-dom";
const Game = () => {
    const [user,setUser] = useState(0); //유저 6명 확인
    const [table,setTable] = useState();
    const receiveTable = ()=> {   //서버에 테이블 요청
        axios.get('https://jsonplaceholder.typicode.com/todos/1').then((reponse) => {
            setTable(reponse.data);
            console.log("테이블 요청!");
        });//table 요청
    }
    const navigate = useNavigate(); //유저 수를 넘겨주기 위한 navigate변수설정
    const gameStart = () => {
        if(user>=2&&user<=6)
            return (
                <div className="underline pulse">
                        <p onClick={()=> {
                            navigate("/poker",{state: {user:user}})
                            //poker페이지 이동시 현재 user인원수 전달
                        }} className="start">입장하기</p>
                </div>
            )
    }
    return (
            <div className="player">
                <div className="butn">
                    <button className="p1" onClick={(e)=> {
                        console.log("Player1입장");  //확인용 메시지(삭제)
                        e.preventDefault();
                        e.currentTarget.disabled = true; //클릭해서 player등록시 다시 클릭 못하게
                        receiveTable();  //테이블 요청
                        setUser(user+1);  //유저수 1명 추가
                    }}>Player1</button>
                    <button className="p2" onClick={(e)=> {
                        console.log("Player2입장");  //확인용 메시지(삭제)
                        e.preventDefault();
                        e.currentTarget.disabled = true;
                        receiveTable();  //테이블 요청
                        setUser(user+1);  //유저수 1명 추가
                    }}>Player2</button>
                    <button className="p3" onClick={(e)=> {
                        console.log("Player3입장");  //확인용 메시지(삭제)
                        e.preventDefault();
                        e.currentTarget.disabled = true;
                        receiveTable();  //테이블 요청
                        setUser(user+1);  //유저수 1명 추가
                    }}>Player3</button>
                    <button className="p4" onClick={(e)=> {
                        console.log("Player4입장");  //확인용 메시지(삭제)
                        e.preventDefault();
                        e.currentTarget.disabled = true;
                        receiveTable();  //테이블 요청
                        setUser(user+1);  //유저수 1명 추가
                    }}>Player4</button>
                    <button className="p5" onClick={(e)=> {
                        console.log("Player5입장");  //확인용 메시지(삭제)
                        e.preventDefault();
                        e.currentTarget.disabled = true;
                        receiveTable();  //테이블 요청
                        setUser(user+1);  //유저수 1명 추가
                    }}>Player5</button>
                    <button className="p6" onClick={(e)=> {
                        console.log("Player6입장");  //확인용 메시지(삭제)
                        e.preventDefault();
                        e.currentTarget.disabled = true;
                        receiveTable();  //테이블 요청
                        setUser(user+1);  //유저수 1명 추가
                    }}>Player6</button>
                    {gameStart()}

                </div>
                    {console.log(user)}


            </div>


    );
};

export default Game;