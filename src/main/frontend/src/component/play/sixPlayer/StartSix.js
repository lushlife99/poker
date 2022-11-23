import React, {useEffect, useState} from 'react';
import SixTable from './SixTable';
import axios from 'axios';
const StartSix = () => {
    const [images,setImages] = useState([
        {id :0, src: '/images/ace_of_spades.png'},
        {id :1, src: '/images/2_of_spades.png'},
        {id :2, src: '/images/3_of_spades.png'},
        {id :3, src: '/images/4_of_spades.png'},
        {id :4, src: '/images/5_of_spades.png'},
        {id :5, src: '/images/6_of_spades.png'},
        {id :6, src: '/images/7_of_spades.png'},
        {id :7, src: '/images/8_of_spades.png'},
        {id :8, src: '/images/9_of_spades.png'},
        {id :9, src: '/images/10_of_spades.png'},
        {id :10, src: '/images/jack_of_spades.png'},
        {id :11, src: '/images/queen_of_spades.png'},
        {id :12, src: '/images/king_of_spades.png'},
        {id :13, src: '/images/ace_of_clubs.png'},
        {id :14, src: '/images/2_of_clubs.png'},
        {id :15, src: '/images/3_of_clubs.png'},
        {id :16, src: '/images/4_of_clubs.png'},
        {id :17, src: '/images/5_of_clubs.png'},
        {id :18, src: '/images/6_of_clubs.png'},
        {id :19, src: '/images/7_of_clubs.png'},
        {id :20, src: '/images/8_of_clubs.png'},
        {id :21, src: '/images/9_of_clubs.png'},
        {id :22, src: '/images/10_of_clubs.png'},
        {id :23, src: '/images/jack_of_clubs.png'},
        {id :24, src: '/images/queen_of_clubs.png'},
        {id :25, src: '/images/king_of_clubs.png'},
        {id :26, src: '/images/ace_of_hearts.png'},
        {id :27, src: '/images/2_of_hearts.png'},
        {id :28, src: '/images/3_of_hearts.png'},
        {id :29, src: '/images/4_of_hearts.png'},
        {id :30, src: '/images/5_of_hearts.png'},
        {id :31, src: '/images/6_of_hearts.png'},
        {id :32, src: '/images/7_of_hearts.png'},
        {id :33, src: '/images/8_of_hearts.png'},
        {id :34, src: '/images/9_of_hearts.png'},
        {id :35, src: '/images/10_of_hearts.png'},
        {id :36, src: '/images/jack_of_hearts.png'},
        {id :37, src: '/images/queen_of_hearts.png'},
        {id :38, src: '/images/king_of_hearts.png'},
        {id :39, src: '/images/ace_of_diamonds.png'},
        {id :40, src: '/images/2_of_diamonds.png'},
        {id :41, src: '/images/3_of_diamonds.png'},
        {id :42, src: '/images/4_of_diamonds.png'},
        {id :43, src: '/images/5_of_diamonds.png'},
        {id :44, src: '/images/6_of_diamonds.png'},
        {id :45, src: '/images/7_of_diamonds.png'},
        {id :46, src: '/images/8_of_diamonds.png'},
        {id :47, src: '/images/9_of_diamonds.png'},
        {id :48, src: '/images/10_of_diamonds.png'},
        {id :49, src: '/images/jack_of_diamonds.png'},
        {id :50, src: '/images/queen_of_diamonds.png'},
        {id :51, src: '/images/king_of_diamonds.png'},
    ]);
    const [show,setShow] = useState(false);
    const [visible,setVisible] = useState(true);
    const [data,setData] = useState();
    useEffect(() => {
        axios.put('http://localhost:8080/api/board/gameStart/1',
        ).then(response => {
            setData(response.data);
            console.log(response.data);
            phase = response.data.data.phaseNum;
            console.log(phase);
        })
    },[]);

    const cardImg = () => {
        return (
            <div className="set2 pullDown">
                <img id="rc2_1" className="c2" src ="/images/backimage.png"/>
                <img id="rc2_2" className="c2" src ="/images/backimage.png"/>
                <img id="rc2_3" className="c2" src ="/images/backimage.png"/>
                <img id="rc2_4" className="c2" src ="/images/backimage.png"/>
                <img id="rc2_5" className="c2" src ="/images/backimage.png"/>
            </div>
        )
    }
    const reverseCard1 = () => { //게임 시작 후 프리플랍시 카드 뒤집기
        setTimeout(function() {
            document.getElementById("img6M1").src =images[data.data.player[0].card1].src;  //data.data.player[0].card1
            console.log(data);
        },1500);
    }//게임 시작 후 프리플랍시 카드 뒤집기
    const reverseCard2 = () => {
        setTimeout(function () {
            document.getElementById("img6M2").src= images[data.data.player[0].card2].src;  //card.data.player[0].card2
        },1900);
    }
    const playerCard1 = () => {  //player1 card1 , card2
        return (
            <div className="g6p1">
                <img id ="img6D1" src ="/images/backimage.png"/>
                <img id ="img6D2" src ="/images/backimage.png"/>
            </div>
        )
    }
    const playerCard2 = () => {  //player2 card1 , card2
        return (
            <div className="g6p2">
                <img id ="img6D1" src ="/images/backimage.png"/>
                <img id ="img6D2" src ="/images/backimage.png"/>
            </div>
        )
    }
    const playerCard3 = () => {  //player3 card1 , card2
        return (
            <div className="g6p3">
                <img id ="img6D1" src ="/images/backimage.png"/>
                <img id ="img6D2" src ="/images/backimage.png"/>
            </div>
        )
    }
    const playerCard4 = () => {  //player4 card1 , card2
        return (
            <div className="g6p4">
                <img id ="img6D1" src ="/images/backimage.png"/>
                <img id ="img6D2" src ="/images/backimage.png"/>
            </div>
        )
    }
    const playerCard5 = () => {  //player5 card1 , card2
        return (
            <div className="g6p5">
                <img id ="img6M1" src ="/images/backimage.png"/>
                <img id ="img6M2" src ="/images/backimage.png"/>
            </div>
        )
    }
    const playerCard6 = () => {  //player6 card1 , card2
        return (
            <div className="g6p6">
                <img id ="img6D1" src ="/images/backimage.png"/>
                <img id ="img6D2" src ="/images/backimage.png"/>
            </div>
        )
    }
    const [raise,setRaise] = useState();
    const onChangeRaise = (e) => { //레이즈 금액 움직이는거 표시
        setRaise(e.target.value);
    };
    const [rb,setRb] = useState(false);  //레이즈 금액 배팅 버튼
    const [rb1,setRb1] = useState(false); //레이즈 금액 배팅 버튼
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

    let betPos;
    let phase;
    let cal;
    let fold;
    let bet;
    const waitRequest = () => {
        axios.put('http://localhost:8080/api/board/1',{data:data.data});
    }
    const timeOut = () => {
        setInterval(waitRequest,3000);
    }
    const rangeBet2= () => {
        return (
            <button id="rb2" onClick={() => {
                document.getElementById("rb1").style.display='none';
                document.getElementById("rb2").style.display='none';
                //let call_cost = data.data.bet - data.data.player[data.data.betPos].cal;
                data.data.player[data.data.betPos].cal += (data.data.bet - data.data.player[data.data.betPos].cal);
                data.data.player[data.data.betPos].stack -= (data.data.bet - data.data.player[data.data.betPos].cal);
                data.data.bet=raise;
                setData(data); //data.data저장
                axios.put('http://localhost:8080/api/board/raiseBetting',{
                    data:data.data //data.data로
                }).then((response) => {
                    bet = response.data.data.bet;
                    betPos = response.data.data.betPos;
                    phase = response.data.data.phaseNum;
                    cal = response.data.data.player[response.data.data.betPos].cal;
                    fold = response.data.data.player[response.data.data.betPos].fold;
                    console.log('레이즈데이터 전송!');
                    setData(response.data);
                    timeOut();
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
                    data.data.player[data.data.betPos].fold = 1;
                    axios.put('http://localhost:8080/api/board/foldBetting',{
                        data:data.data //data.data로
                    }).then((response) => {
                        console.log('폴드데이터 전송!');
                        setData(response.data);
                        console.log(response.data);
                        timeOut();
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
                        console.log(response.data);
                        setData(response.data);
                        timeOut();
                    });
                    console.log(data);
                }}>체크</button>
                <button id = "r1" className="raise" onClick={() => {
                    document.getElementById("f1").style.display='none';
                    document.getElementById("c1").style.display='none';
                    document.getElementById("r1").style.display='none';
                    setRb(true);
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
                    data.data.player[data.data.betPos].fold = 1;
                    axios.put('http://localhost:8080/api/board/foldBetting',{
                        data:data.data //data.data로
                    }).then((response) => {
                        console.log('폴드데이터 전송!');
                        console.log(response.data);
                        //response.data.data.player[response.data.data.betPos].fold = 1;
                        setData(response.data);
                        timeOut();
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
                        bet = response.data.data.bet;
                        betPos = response.data.data.betPos;
                        phase = response.data.data.phaseNum;
                        cal = response.data.data.player[response.data.data.betPos].cal;
                        fold = response.data.data.player[response.data.data.betPos].fold;
                        setData(response.data);
                        console.log(response.data);
                        timeOut();
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
                    data.data.player[data.data.betPos].fold = 1;
                    axios.put('http://localhost:8080/api/board/foldBetting',{
                        data:data.data //data.data로
                    }).then((response) => {
                        console.log('폴드데이터 전송!');
                        // response.data.data.player[response.data.data.betPos].fold = 1;
                        setData(response.data);
                        console.log(response.data);
                        timeOut();
                    });
                }}>폴드</button>
                <button id="all" className ="allIn" onClick={() => {
                    document.getElementById("f3").style.display='none';
                    document.getElementById("all").style.display='none';
                    data.data.player[data.data.betPos].fold = 2;
                    axios.put('http://localhost:8080/api/board/raiseBetting', {
                        data:data.data
                    }).then((response) => {
                        console.log('올인!');
                        //response.data.data.player[response.data.data.betPos].fold =2;
                        setData(response.data);
                        timeOut();
                    });
                }}>
                    올인</button>
            </div>
        )
    }

    const foldInput = () => {
        return (
            <input type="text" value="폴드"/>
        )
    }
    const callInput = () => {
        return (
            <input type="text" value="콜"/>
        )
    }
    const allInput = () => {
        return (
            <input type="text" value="올인"/>
        )
    }
    const raiseInput = () => {
        return (
            <input type="text" value="레이즈"/>
        )
    }
    const checkInput = () => {
        return (
            <input type="text" value="체크"/>
        )
    }

    return (
        <div>
            <SixTable images={images} setImages={setImages} cardImg={cardImg}
                      show={show} setShow={setShow} visible={visible} setVisible={setVisible}
                      playerCard1={playerCard1} playerCard2={playerCard2} playerCard3={playerCard3}
                      playerCard4={playerCard4} playerCard5={playerCard5} playerCard6={playerCard6}
                      reverseCard1={reverseCard1} reverseCard2={reverseCard2}
                      data={data} setData={setData} betBtn1={betBtn1} betBtn2={betBtn2} betBtn3={betBtn3}
                      phase3={phase3} phase4={phase4} phase5={phase5}

            />
        </div>
    );
};

export default StartSix;