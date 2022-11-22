import React, {useState} from 'react';
import './SixTable.css';
import axios from "axios";

const SixTable = (props) => {
    const {images,setImage,cardImg,show,setShow,visible,setVisible,
        playerCard1,playerCard2,playerCard3,playerCard4,playerCard5,playerCard6,
        data,setData,reverseCard1,reverseCard2} = props;
    const [raise,setRaise] = useState();
    const onChangeRaise = (e) => {
        setRaise(e.target.value);
    };
    const phase3 = () => {
        if(data&&data.data.phaseNum===3) {
            document.getElementById("rc2_1").src = images[data.data.card1].src;
            document.getElementById("rc2_2").src = images[data.data.card2].src;
            document.getElementById("rc2_3").src = images[data.data.card3].src;
        }
    };
    const phase4 = () => {
        if(data&&data.phaseNum===4)
            document.getElementById("rc2_4").src = images[data.data.card4].src;
    };
    const phase5 = () => {
        if(data&&data.phaseNum===5)
            document.getElementById("rc2_5").src = images[data.data.card5].src;
    };
    const [fol,setFol] = useState(false);
    const [call,setCall] = useState(false);
    const [all,setAll] = useState(false);
    const [rai,setRai] = useState(false);
    const [chec,setChec] = useState(false);
    let betPos;
    let phase;
    let cal;
    let fold;
    const check = () => {
        while(data&&phase==data.data.phaseNum) {
            if (data && (data.data.player[data.data.betPos].id == data.data.player[0].id))
                console.log('player1배팅');
            else if (data && (data.data.player[data.data.betPos].id == data.data.player[1].id))
                console.log('player2배팅');
            else if (data && (data.data.player[data.data.betPos].id == data.data.player[2].id))
                console.log('player3배팅');
            else if (data && (data.data.player[data.data.betPos].id == data.data.player[3].id))
                console.log('player4배팅');
            else if (data && (data.data.player[data.data.betPos].id == data.data.player[4].id))
                console.log('player5배팅');
            else if (data && (data.data.player[data.data.betPos].id == data.data.player[5].id))
                console.log('player6배팅');
            else {
                axios.put('http://localhost:8080/api/board/1',{
                }).then((response) => {
                    console.log('대기 요청!');
                });
                if (data && (betPos !== data.data.betPos))
                    setRai(true);
                else if(fold===1)
                    setFol(true);
                else if(fold===2)
                    setAll(true);
                else if(data&&(call!==data.data.player[data.data.betPos]))
                    setCall(true);
                else
                    setChec(true);
            }
        }
    }

    const rangeBet2= () => {
        return (
            <button id="rb2" onClick={() => {
                document.getElementById("rb1").style.display='none';
                document.getElementById("rb2").style.display='none';
                let call_cost = data.data.bet - data.data.player[data.data.betPos].cal;
                data.data.player[data.data.betPos].cal += call_cost;
                data.data.player[data.data.betPos].stack -= call_cost;
                data.data.bet=raise;
                setData(data); //data.data저장
                axios.put('http://localhost:8080/api/board/raiseBetting',{
                    data:data.data //data.data로
                }).then((response) => {
                    console.log('레이즈데이터 전송!');
                    console.log(response.data);
                    setData(response.data);
                });

            }}>{raise}</button>
        )
    }
    const [rb,setRb] = useState(false);
    const [rb1,setRb1] = useState(false);

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
                        console.log(response.data);
                    });

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
                    axios.put('http://localhost:8080/api/board/1',{
                    }).then((response) => {
                        console.log('대기 요청!');
                    });
                    console.log(data);
                }}>체크</button>
                <button id = "r1" className="raise" onClick={() => {
                    document.getElementById("f1").style.display='none';
                    document.getElementById("c1").style.display='none';
                    document.getElementById("r1").style.display='none';
                    setRb(true);
                    // let addbutton = document.querySelector(".bet1");
                    // addbutton.appendChild(raiseBetting);  //금액 range와 확인 버튼
                }}>레이즈</button>
                {rb&&<input id ="rb1" type="range" name="number" min="10000" max="300000" step="1000"
                            onChange={onChangeRaise}/>}
                {rb&&rangeBet2()}
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
                    axios.put('http://localhost:8080/api/board/1',{
                    }).then((response) => {
                        console.log('대기 요청!');
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
                    axios.put('http://localhost:8080/api/board/1',{
                    }).then((response) => {
                        console.log('대기 요청!');
                    });
                }}>콜</button>
                <button id = "r2" className="raise" onClick={() => {
                    document.getElementById("f2").style.display='none';
                    document.getElementById("c2").style.display='none';
                    document.getElementById("r2").style.display='none';
                    setRb1(true);
                }}>레이즈</button>
                {rb1&&<input id ="rb1" type="range" name="number" min="10000" max="300000" step="1000"
                             onChange={onChangeRaise}/>}
                {rb1&&rangeBet2()}
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
                    setInterval(function () {
                        axios.put('http://localhost:8080/api/board/wait/1',{
                        }).then((response) => {
                            console.log('대기 요청!');
                        });
                    },5000);
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
                <div className="g1">
                    <img className="gamerW2_1" src="/images/player1.png"/>
                    {show&&playerCard1()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[4].id)&&data.data.bet==0&&betBtn1()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[4].id)&&data.data.bet!=0&&
                        (data.data.player[data.data.betPos].stack > data.data.bet-data.data.player[data.data.betPos].cal)&&betBtn2()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[4].id)&&
                        (data.data.bet-data.data.player[data.data.betPos].cal>=data.data.player[data.data.betPos].stack)&&betBtn3()}
                    {check()}
                    {data&&rai&&<input type="text" value = "레이즈"/>}
                    {data&&fol&&<input type="text" value = "폴드"/>}
                    {data&&chec&&<input type="text" value = "체크"/>}
                    {data&&call&&<input type="text" value = "콜"/>}
                    {data&&all&&<input type="text" value = "올인"/>}
                </div>
                <div className="g2">
                    <img className="gamerW2_1" src="/images/player2.png"/>
                    {show&&playerCard2()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[3].id)&&data.data.bet==0&&betBtn1()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[3].id)&&data.data.bet!=0&&
                        (data.data.player[data.data.betPos].stack > data.data.bet-data.data.player[data.data.betPos].cal)&&betBtn2()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[3].id)&&
                        (data.data.bet-data.data.player[data.data.betPos].cal>=data.data.player[data.data.betPos].stack)&&betBtn3()}
                    {check()}
                    {data&&rai&&<input type="text" value = "레이즈"/>}
                    {data&&fol&&<input type="text" value = "폴드"/>}
                    {data&&chec&&<input type="text" value = "체크"/>}
                    {data&&call&&<input type="text" value = "콜"/>}
                    {data&&all&&<input type="text" value = "올인"/>}
                </div>
                <div className="g3">
                    <img className="gamerW2_1" src="/images/player3.png"/>
                    {show&&playerCard3()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[2].id)&&data.data.bet==0&&betBtn1()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[2].id)&&data.data.bet!=0&&
                        (data.data.player[data.data.betPos].stack > data.data.bet-data.data.player[data.data.betPos].cal)&&betBtn2()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[2].id)&&
                        (data.data.bet-data.data.player[data.data.betPos].cal>=data.data.player[data.data.betPos].stack)&&betBtn3()}
                    {check()}
                    {data&&rai&&<input type="text" value = "레이즈"/>}
                    {data&&fol&&<input type="text" value = "폴드"/>}
                    {data&&chec&&<input type="text" value = "체크"/>}
                    {data&&call&&<input type="text" value = "콜"/>}
                    {data&&all&&<input type="text" value = "올인"/>}
                </div>
            </div>
            {visible&&<button className="fixedBtn" onClick={ () => {
                setShow(true); //버튼 누를시 카드 5장 보이게
                setVisible(false); //버튼 클릭시 게임시작 버튼 사라지게함
                console.log('카드 데이터 요청');
                reverseCard1(); //자기 카드1 뒤집기
                reverseCard2(); //자기 카드2 뒤집기
            }}>게임시작</button>}
            {show&&cardImg()}
            <div className ="w2p2">
                <div className ="g4">
                    <img className="gamerW2_2" src="/images/player4.png"/>
                    {show&&playerCard4()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[5].id)&&data.data.bet==0&&betBtn1()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[5].id)&&data.data.bet!=0&&
                        (data.data.player[data.data.betPos].stack > data.data.bet-data.data.player[data.data.betPos].cal)&&betBtn2()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[5].id)&&
                        (data.data.bet-data.data.player[data.data.betPos].cal>=data.data.player[data.data.betPos].stack)&&betBtn3()}
                    {check()}
                    {data&&rai&&<input type="text" value = "레이즈"/>}
                    {data&&fol&&<input type="text" value = "폴드"/>}
                    {data&&chec&&<input type="text" value = "체크"/>}
                    {data&&call&&<input type="text" value = "콜"/>}
                    {data&&all&&<input type="text" value = "올인"/>}
                </div>
                <div className="g5">
                    <img className="gamerW2_2" src="/images/player5.png"/>
                    {show&&playerCard5()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[0].id)&&data.data.bet==0&&betBtn1()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[0].id)&&data.data.bet!=0&&
                        (data.data.player[data.data.betPos].stack > data.data.bet-data.data.player[data.data.betPos].cal)&&betBtn2()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[0].id)&&
                        (data.data.bet-data.data.player[data.data.betPos].cal>=data.data.player[data.data.betPos].stack)&&betBtn3()}
                    {check()}
                    {data&&rai&&<input type="text" value = "레이즈"/>}
                    {data&&fol&&<input type="text" value = "폴드"/>}
                    {data&&chec&&<input type="text" value = "체크"/>}
                    {data&&call&&<input type="text" value = "콜"/>}
                    {data&&all&&<input type="text" value = "올인"/>}
                </div>
                <div className="g6">
                    <img className="gamerW2_2" src="/images/player6.png"/>
                    {show&&playerCard6()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[1].id)&&data.data.bet==0&&betBtn1()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[1].id)&&data.data.bet!=0&&
                        (data.data.player[data.data.betPos].stack > data.data.bet-data.data.player[data.data.betPos].cal)&&betBtn2()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[1].id)&&
                        (data.data.bet-data.data.player[data.data.betPos].cal>=data.data.player[data.data.betPos].stack)&&betBtn3()}
                    {check()}
                    {data&&rai&&<input type="text" value = "레이즈"/>}
                    {data&&fol&&<input type="text" value = "폴드"/>}
                    {data&&chec&&<input type="text" value = "체크"/>}
                    {data&&call&&<input type="text" value = "콜"/>}
                    {data&&all&&<input type="text" value = "올인"/>}
                </div>
            </div>
            {phase3()}
            {phase4()}
            {phase5()}
        </div>
    );
};
export default SixTable;