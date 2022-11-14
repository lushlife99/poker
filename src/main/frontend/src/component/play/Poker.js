import React, {useState} from 'react';
import {Button,ButtonToolbar} from 'react-bootstrap';
import { useLocation} from 'react-router';
import Buyin from './Buyin';
import axios from 'axios';

import './Poker.css';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Poker = () => {
    const location = useLocation(); //넘어온 user의 수 받기 위함
    const money = 30;
    const sendmonydata = 40; //가정한 값
    const navigate = useNavigate(); //프리플랍 페이지이동
    const [stack,setStack] = useState();
    const deleteButton = () => {  //바이인 버튼 클릭시 삭제
        document.getElementById("btn").style.display="none";
    }

    function playerNumber() {
        switch(location.state.user) {
            case 2:
                console.log('2명!');
                navigate("/free");  //2명인 view
                break;
            case 3:
                console.log('3명!');
                navigate("/three");  //3명 view
                break;
            case 4:
                console.log('4명!');
                navigate('/four'); //4명 view
                break;
            case 5:
                console.log('5명!');
                navigate('/five');  //5명 view
                break;
            case 6:
                console.log('6명!');
                navigate('/six');  //6명 view
                break;

        }
    }
    const [card,setCard] = useState();
    return (
        <div>
            <div id ="btn" className="table">
                  <button className="buyIn" onClick={()=> {
                      deleteButton()
                      if (sendmonydata<30) {
                          alert('불가')
                      }
                      else {
                          console.log(location.state.user);
                          alert('완료')
                          axios.put('https://jsonplaceholder.typicode.com/todos/1',{
                              stack:stack,
                              //stack 전송  30만으로 고정
                          })
                          axios.get('https://jsonplaceholder.typicode.com/todos/1').then((reponse) => {
                              setCard(reponse.data);
                              console.log('카드요청')   //프리 플랍
                          })
                      }
                      playerNumber();
                  }}>30만 바이인</button>
            </div>
        </div>




    );
};
export default Poker;