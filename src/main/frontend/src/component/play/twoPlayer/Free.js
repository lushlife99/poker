import React, {useState,useEffect,useRef} from 'react';
import './Free.css';
import {Link} from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router';
import StartTwo from './StartTwo';
import Betting from './Betting';

const Free = (props) => {
    const {show,setShow,visible,setVisible,cardImg,playerCard1,playerCard2,data,setData
        ,reverseCard1,reverseCard2,bett,priority,bet,setBet,betDiff,setDiff} = props;
    const [data1,setData1] = useState();
    const [data2,setData2] = useState();
    const [data3,setData3] = useState();
    const [raise,setRaise] = useState();
    const [raiseShow,setRaiseShow] =useState(false);
    const [callCost,setCallCost] = useState();
    const onChangeRaise = (e) => {
        setRaise(e.target.value);
    };

    const raiseBetting = document.createElement("div");
    const rbtn = document.createElement("button");
    const input = document.createElement("input");

    raiseBetting.appendChild(rbtn);
    raiseBetting.appendChild(input);

    input.id = "inputRaise";
    input.type = "range";
    input.name = "number";
    input.min = "10000";
    input.max = "300000";
    input.step ="1000";
    input.onchange = onChangeRaise;

    rbtn.onchange = onChangeRaise;
    rbtn.innerHTML = `${raise}`;
    //rbtn.onclick
    // rbtn.onClick = () => {
    //     let call_cost = data.data.bet - data.data.player[0].cal;
    //     data.data.player[data.data.betPos].cal += call_cost;
    //     data.data.player[data.data.betPos].stack -= call_cost;
    //     data.data.bet=raise;
    //     setData(data); //data.data저장
    //     document.getElementById("rb1").style.display='none';
    //     document.getElementById("rb2").style.display='none';
    //     axios.put('http://localhost:8080/api/board/raiseBetting',{
    //         data:data.data //data.data로
    //     }).then((response) => {
    //         console.log('레이즈데이터 전송!');
    //         setData(response.data);
    //     });
    // }
    console.log(raise);

   // const a = document.getElementById("r1");
   // const b = document.getElementById("r2");
     const raiseBet = () => {
         return (
             <input id ="rb1" type="range" name="number" min="10000" max="300000" step="1000"
                    onChange={onChangeRaise}/>
         )
     }
    const clickRaise = () => {
        return (
            <button id="rb2" onClick={() => {
                let call_cost = data.data.bet - data.data.player[0].cal;
                data.data.player[data.data.betPos].cal += call_cost;
                data.data.player[data.data.betPos].stack -= call_cost;
                data.data.bet=raise;
                setData(data); //data.data저장
                document.getElementById("rb1").style.display='none';
                document.getElementById("rb2").style.display='none';
                axios.put('http://localhost:8080/api/board/raiseBetting',{
                    data:data.data //data.data로
                }).then((response) => {
                    console.log('레이즈데이터 전송!');
                    setData(response.data);
                });
            }}>{raise}</button>
        )
    }
    const betBtn1 = () => {
        return (
            <div className="bet1">
                <button id="f1" className="fold" onClick={()=> {
                    document.getElementById("f1").style.display='none';
                    document.getElementById("c1").style.display='none';
                    document.getElementById("r1").style.display='none';
                    axios.put('http://localhost:8080/api/board/foldBetting',{
                        data:data.data //data.data로
                    }).then((response) => {
                        console.log('폴드데이터 전송!');
                        setData(response.data);
                    });
                    console.log(data);
                }}>폴드</button>
                <button id = "c1" className="check" onClick={() => {
                    document.getElementById("f1").style.display='none';
                    document.getElementById("c1").style.display='none';
                    document.getElementById("r1").style.display='none';
                    axios.put('http://localhost:8080/api/board/callBetting',{
                        data:data.data //data.data로
                    }).then((response) => {
                        console.log('체크데이터 전송!');
                        setData(response.data);
                    });
                    console.log(data);
                }}>체크</button>
                <button id = "r1" className="raise" onClick={() => {
                    document.getElementById("f1").style.display='none';
                    document.getElementById("c1").style.display='none';
                    document.getElementById("r1").style.display='none';
                    let addbutton = document.querySelector(".bet1");
                    addbutton.appendChild(raiseBetting);  //금액 range와 확인 버튼
                }}>레이즈</button>
            </div>
        )
    }
    const betBtn2 = () => {
        return (
            <div className="bet2">
                <button id="f2" className="fold" onClick={()=> {
                    document.getElementById("f2").style.display='none';
                    document.getElementById("c2").style.display='none';
                    document.getElementById("r2").style.display='none';
                    axios.put('http://localhost:8080/api/board/foldBetting',{
                        data:data.data //data.data로
                    }).then((response) => {
                        console.log('폴드데이터 전송!');
                        setData(response.data);
                    });
                }}>폴드</button>
                <button id = "c2" className="check" onClick={() => {
                    document.getElementById("f2").style.display='none';
                    document.getElementById("c2").style.display='none';
                    document.getElementById("r2").style.display='none';
                    axios.put('http://localhost:8080/api/board/callBetting',{
                        data:data.data //data.data로
                    }).then((response) => {
                        console.log('체크데이터 전송!');
                        setData(response.data);
                    });
                }}>콜</button>
                <button id = "r2" className="raise" onClick={() => {
                    document.getElementById("f2").style.display='none';
                    document.getElementById("c2").style.display='none';
                    document.getElementById("r2").style.display='none';
                    setRaiseShow(true);
                }}>레이즈</button>
            </div>
        )
    }
    const betBtn3 = () => {
        return (
            <div className="bet3">
                <button id="f3" className="fold" onClick={()=> {
                    alert('폴드');
                    document.getElementById("f3").style.display='none';
                    document.getElementById("c3").style.display='none';
                    document.getElementById("r3").style.display='none';
                    axios.put('http://localhost:8080/api/board/foldBetting',{
                        data:data.data //data.data로
                    }).then((response) => {
                        console.log('폴드데이터 전송!');
                        setData(response.data);
                    });
                }}>폴드</button>
                <button id="all" className ="allIn" onClick={() => {
                    document.getElementById("f3").style.display='none';
                    document.getElementById("all").style.display='none';
                }}>
                    올인</button>
            </div>
        )
    }
    return (
        <div className="board">
            <div className="w2p1">
                <div>
                    <img className="gamerW2_1" src="/images/player1.png"/>
                    {show&&playerCard1()}
                </div>
                {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[1].id)&&data.data.bet==0&&betBtn1()}

                {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[1].id)&&data.data.bet!=0&&
                    (data.data.player[data.data.betPos].stack > data.data.bet-data.data.player[data.data.betPos].cal)&&betBtn2()}

                {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[1].id)&&
                    (data.data.bet-data.data.player[data.data.betPos].cal>=data.data.player[data.data.betPos].stack)&&betBtn3()}

                {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[1].id)&&raiseShow&&raiseBet()}
                {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[1].id)&&raiseShow&&clickRaise()}

            </div>
            {visible&&<button className="fixedBtn" onClick={() => {
                setVisible(false);
                setShow(true);
                console.log('카드데이터요청!');
                reverseCard1();
                reverseCard2();
                //게임 시작 누르고 카드 뒤집은 후 배팅화면 보여줌
            }}>게임시작</button>}
            {show && cardImg()}
            <div className ="w2p2">
                <div>
                    <img className="gamerW2_2" src="/images/player2.png"/>
                    {show&&playerCard2()}
                    {betBtn1()}
                </div>
                {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[0].id)&&data.data.bet==0&&betBtn1()}
                {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[0].id)&&data.data.bet!=0&&
                    (data.data.player[data.data.betPos].stack > data.data.bet-data.data.player[data.data.betPos].cal)&&betBtn2()}
                {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[0].id)&&
                    (data.data.bet-data.data.player[data.data.betPos].cal>=data.data.player[data.data.betPos].stack)&&betBtn3()}
                {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[0].id)&&raiseShow&&raiseBet()}
                {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[0].id)&&raiseShow&&clickRaise()}


            </div>
        </div>
    );
};

export default Free;