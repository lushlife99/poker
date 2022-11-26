import React, {useEffect, useState,useMemo} from 'react';
import SixTable from './SixTable';
import axios from 'axios';
import {useTimer} from 'use-timer';
import {useCookies} from 'react-cookie';
const StartSix = () => {
    const [cookies, get] = useCookies();
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
    const [flip3,setFlip3] = useState(false);
    const [flip4,setFlip4] = useState(false);
    const [flip5,setFlip5] = useState(false);
    const [index,setIndex] = useState();
    useEffect(() => {
        axios.put('http://localhost:8080/api/board/gameStart/1',
        ).then(response => {
            setData(response.data);
            user(response.data);
        })
    },[]);
    const deleteTimer = () => {
        document.getElementById("timer").style.display='none';
    }
    const {time,start,reset} = useTimer({  //배팅 타이머
        initialTime:10, //timer 시작 시간
        endTime : 0,  //timer가 끝나는 시간
        timerType: 'DECREMENTAL',  //감소하는 timer
        onTimeOver : () => {  //시간 over되면 발동되는 함수
            //deleteTimer();
            //alert('시간 초과');
            //reset();  //시간 초과시 다시 countDown하게
            //fold =1 로 설정
        }
    });
    const bet1 = () => {
        if(show&&data&&(data.data.player[data.data.betPos].id==data.data.player[index].id)&&data.data.bet==0)
            return betBtn1();
        else if(show&&data&&(data.data.player[data.data.betPos].id==data.data.player[index].id)&&data.data.bet!=0&&
            (data.data.player[data.data.betPos].stack > data.data.bet-data.data.player[data.data.betPos].cal))
            return betBtn2();
        else if(show&&data&&(data.data.player[data.data.betPos].id==data.data.player[index].id)&&
            (data.data.bet-data.data.player[data.data.betPos].cal>=data.data.player[data.data.betPos].stack))
            return betBtn3();
    }
    const bet2 = () => {
        if(show&&data&&(data.data.player[data.data.betPos].id==data.data.player[1].id)&&data.data.bet==0)
            return betBtn1();
        else if(show&&data&&(data.data.player[data.data.betPos].id==data.data.player[1].id)&&data.data.bet!=0&&
            (data.data.player[data.data.betPos].stack > data.data.bet-data.data.player[data.data.betPos].cal))
            return betBtn2();
        else if(show&&data&&(data.data.player[data.data.betPos].id==data.data.player[1].id)&&
            (data.data.bet-data.data.player[data.data.betPos].cal>=data.data.player[data.data.betPos].stack))
            return betBtn3();
    }
    const bet3 = () => {
        if(show&&data&&(data.data.player[data.data.betPos].id==data.data.player[2].id)&&data.data.bet==0)
            return betBtn1();
        else if(show&&data&&(data.data.player[data.data.betPos].id==data.data.player[2].id)&&data.data.bet!=0&&
            (data.data.player[data.data.betPos].stack > data.data.bet-data.data.player[data.data.betPos].cal))
            return betBtn2();
        else if(show&&data&&(data.data.player[data.data.betPos].id==data.data.player[2].id)&&
            (data.data.bet-data.data.player[data.data.betPos].cal>=data.data.player[data.data.betPos].stack))
            return betBtn3();
    }
    const bet4 = () => {
        if(show&&data&&(data.data.player[data.data.betPos].id==data.data.player[3].id)&&data.data.bet==0)
            return betBtn1();
        else if(show&&data&&(data.data.player[data.data.betPos].id==data.data.player[3].id)&&data.data.bet!=0&&
            (data.data.player[data.data.betPos].stack > data.data.bet-data.data.player[data.data.betPos].cal))
            return betBtn2();
        else if(show&&data&&(data.data.player[data.data.betPos].id==data.data.player[3].id)&&
            (data.data.bet-data.data.player[data.data.betPos].cal>=data.data.player[data.data.betPos].stack))
            return betBtn3();
    }
    const bet5 = () => {
        if(show&&data&&(data.data.player[data.data.betPos].id==data.data.player[4].id)&&data.data.bet==0)
            return betBtn1();
        else if(show&&data&&(data.data.player[data.data.betPos].id==data.data.player[4].id)&&data.data.bet!=0&&
            (data.data.player[data.data.betPos].stack > data.data.bet-data.data.player[data.data.betPos].cal))
            return betBtn2();
        else if(show&&data&&(data.data.player[data.data.betPos].id==data.data.player[4].id)&&
            (data.data.bet-data.data.player[data.data.betPos].cal>=data.data.player[data.data.betPos].stack))
            return betBtn3();
    }
    const bet6 = () => {
        if(show&&data&&(data.data.player[data.data.betPos].id==data.data.player[5].id)&&data.data.bet==0)
            return betBtn1();
        else if(show&&data&&(data.data.player[data.data.betPos].id==data.data.player[5].id)&&data.data.bet!=0&&
            (data.data.player[data.data.betPos].stack > data.data.bet-data.data.player[data.data.betPos].cal))
            return betBtn2();
        else if(show&&data&&(data.data.player[data.data.betPos].id==data.data.player[5].id)&&
            (data.data.bet-data.data.player[data.data.betPos].cal>=data.data.player[data.data.betPos].stack))
            return betBtn3();
    }

    const timer1 = () => {
        return (
            <button id ="timer">{time}</button>
        )
    }
    const cardImg = () => {
        return (
            <div className="set2 pullDown">
                <img id="rc2_1" className={flip3 ? 'flip-vertical-right':'c2'} src ="/images/backimage.png"/>
                <img id="rc2_2" className={flip3 ? 'flip-vertical-right':'c2'} src ="/images/backimage.png"/>
                <img id="rc2_3" className={flip3 ? 'flip-vertical-right':'c2'} src ="/images/backimage.png"/>
                <img id="rc2_4" className={flip4 ? 'flip-vertical-right':'c2'} src ="/images/backimage.png"/>
                <img id="rc2_5" className="blink-2" src ="/images/backimage.png"/>
            </div>
        )
    }
    const reverseCard1 = () => { //게임 시작 후 프리플랍시 카드 뒤집기 + animation 추가
        setTimeout(function() {
            document.getElementById("img6M1").src =images[data.data.player[0].card1].src;  //data.data.player[0].card1
        },500);
    }//게임 시작 후 프리플랍시 카드 뒤집기 + animation 추가
    const reverseCard2 = () => {
        setTimeout(function () {
            document.getElementById("img6M2").src= images[data.data.player[0].card2].src;  //data.data.player[0].card2
        },500);
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
                <img className="flip-vertical-right" id ="img6M1" src ="/images/backimage.png"/>
                <img className="flip-vertical-left" id ="img6M2" src ="/images/backimage.png"/>
            </div>
        )
    }
    const playerCard6 = () => {  //player6 card1 , card2
        return (
            <div id= "betPos0" className="g6p6">
                <img id ="img6D1" src ="/images/backimage.png"/>
                <img id ="img6D2" src ="/images/backimage.png"/>
            </div>
        )
    }

    const user = (data) => {

        for(let i =0; i<data.data.total_player; i++) {
            if(data.data.player[i].id === parseInt(document.cookie.at(9))) {
                setIndex(i);
                break;
            }
        }
    }

    const playerBett = () => {
        console.log("3");
        if(data&&(data.data.phaseNum<6)) {
            if((data.data.betPos === index)) {
                if (show && data && (data.data.player[data.data.betPos].id == data.data.player[index].id) && data.data.bet == 0)
                    return betBtn1();
                else if (show && data && (data.data.player[data.data.betPos].id == data.data.player[index].id) && data.data.bet != 0 &&
                    (data.data.player[data.data.betPos].stack > data.data.bet - data.data.player[data.data.betPos].cal))
                    return betBtn2();
                else if (show && data && (data.data.player[data.data.betPos].id == data.data.player[index].id) &&
                    (data.data.bet - data.data.player[data.data.betPos].cal >= data.data.player[data.data.betPos].stack))
                    return betBtn3();
            }
            else{
                timeOut();
            }

        }


    }

    const [raise,setRaise] = useState();
    const onChangeRaise = (e) => { //레이즈 금액 움직이는거 표시
        setRaise(e.target.value);
    };
    const [rb,setRb] = useState(false);  //레이즈 금액 배팅 버튼
    const [rbr,setRbr] = useState(false); //레이즈 금액 배팅 버튼
    const phase3 = () => {  //페이즈3 -> 카드3장 뒤집음
        if(data&&data.data.phaseNum===3) {
            setFlip3(true);
            //deleteState();
            document.getElementById("rc2_1").src = images[data.data.card1].src;
            document.getElementById("rc2_2").src = images[data.data.card2].src;
            document.getElementById("rc2_3").src = images[data.data.card3].src;
        }
    };

    const phase4 = () => {  //페이즈4 -> 카드 1장 뒤집음
        if(data&&data.data.phaseNum===4) {
            setFlip4(true);
            //deleteState();
            document.getElementById("rc2_4").src = images[data.data.card4].src;
        }

    };

    const phase5 = () => { //페이즈5 -> 카드 1장 뒤집음
        if(data&&data.data.phaseNum===5) {
            setFlip5(true);
            //deleteState();
            document.getElementById("rc2_5").src = images[data.data.card5].src;
        }
    };
    /*const result = () => {
        for(int i=0;i<data.data.arr.length;i++) {
            for(int j=0;j<data.data.arr[i].length;j++)

        }
    }*/

    const phase6 = () => {
        if(data&&data.data.phaseNum===6) {
            axios.put('http://localhost:8080/api/board/determineWinner',{
                data:data.data //data.data로
            }).then((response) => {
                setData(response.data);
                for(let i =0; i<data.data.arr.length; i++) {
                    alert((i+1)+"등 player "+data.data.arr[i][0]+" 스택 : "+data.data.arr[i][1]+"족보 값 : "+data.data.arr[i][2]);
                }
            });
        }



    }
    const waitRequest = () => {  //대기하면서 서버에 요청
        axios.put('http://localhost:8080/api/board/1').then((res) => {
            setData(res);
            console.log(data);
        });
    }
    const timeOut = () => {  //2초마다 대기요청 -> 서버에 무리감
        setInterval(waitRequest,2000);
    }
    const [fold,setFold] = useState(false);
    const [check,setCheck] = useState(false);
    const [rai,setRai] = useState(false);
    const [call,setCall] = useState(false);
    const [all,setAll] = useState(false);
    const [a,setA] = useState(true);
    const request = () => {

    }

    const rangeBet2= () => {
        return (
            <button id="rb2" onClick={() => {
                document.getElementById("rb1").style.display='none';
                document.getElementById("rb2").style.display='none';
                setRai(true);
                deleteTimer();
                setA(false);
                data.data.bet=parseInt(raise);
                data.data.player[data.data.betPos].jokBo = 3;
                let call_cost = data.data.bet - data.data.player[data.data.betPos].cal;
                if(data&&(parseInt(raise)===data.data.player[data.data.betPos].stack)) {
                    data.data.player[data.data.betPos].fold=2;
                    axios.put('http://localhost:8080/api/board/raiseBetting',{
                        data:data.data
                    }).then((response) => {
                        setData(response.data);
                    })
                }
                else {
                    data.data.player[data.data.betPos].cal += call_cost;
                    data.data.player[data.data.betPos].stack -= call_cost;
                    axios.put('http://localhost:8080/api/board/raiseBetting',{
                        data:data.data //data.data로
                    }).then((response) => {
                        console.log('레이즈데이터 전송!');
                        console.log(response.data.data);
                        setData(response.data);
                        // timeOut();
                    });
                }

            }}>{raise}</button>
        )
    }
    const foldCard = () =>{
        if(data.data.betPos==0)
            document.getElementById("betPos0").style.display='none';
        else if(data.data.betPos==1)
            document.getElementById("betPos1").style.display='none';
        else if(data.data.betPos==2)
            document.getElementById("betPos2").style.display='none';
        else if(data.data.betPos==3)
            document.getElementById("betPos3").style.display='none';
        else if(data.data.betPos==4)
            document.getElementById("betPos4").style.display='none';
        else
            document.getElementById("betPos5").style.display='none';
    }

    const betBtn1 = () => {
        return (
            <div className="bet1">
                <button id="f1" className="fold" onClick={()=> {
                    document.getElementById("f1").style.display='none';
                    document.getElementById("c1").style.display='none';
                    document.getElementById("r1").style.display='none';
                    setFold(true);
                    deleteTimer();
                    //foldCard();
                    data.data.player[data.data.betPos].fold = 1;
                    axios.put('http://localhost:8080/api/board/foldBetting',{
                        data:data.data //data.data로
                    }).then((response) => {
                        console.log('폴드데이터 전송!');
                        setData(response.data);
                        console.log(response.data);
                        //  timeOut();
                    });
                }}>폴드</button>
                <button id = "c1" className="check" onClick={() => {
                    document.getElementById("f1").style.display='none';
                    document.getElementById("c1").style.display='none';
                    document.getElementById("r1").style.display='none';
                    setCheck(true);
                    deleteTimer();
                    data.data.player[data.data.betPos].jokBo = 4;
                    axios.put('http://localhost:8080/api/board/callBetting',{
                        data:data.data //data.data로
                    }).then((response) => {
                        console.log('체크데이터 전송!');
                        console.log(response.data);
                        setData(response.data);
                        //  timeOut();
                    });
                    console.log(data);
                }}>체크</button>
                <button id = "r1" className="raise" onClick={() => {
                    document.getElementById("f1").style.display='none';
                    document.getElementById("c1").style.display='none';
                    document.getElementById("r1").style.display='none';
                    setRb(true);
                }}>레이즈</button>
                {rb&& <input id ="rb1" type="range" name="number"
                             min={data.data.bet} max={data.data.player[data.data.betPos].stack} step="1000"
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
                    setFold(true);
                    //foldCard();
                    data.data.player[data.data.betPos].fold = 1;
                    axios.put('http://localhost:8080/api/board/foldBetting',{
                        data:data.data //data.data로
                    }).then((response) => {
                        console.log('폴드데이터 전송!');
                        console.log(response.data);
                        setData(response.data);
                        //  timeOut();
                    });
                }}>폴드</button>
                <button id = "c2" className="check" onClick={() => {
                    document.getElementById("f2").style.display='none';
                    document.getElementById("c2").style.display='none';
                    document.getElementById("r2").style.display='none';
                    setCall(true);
                    data.data.player[data.data.betPos].jokBo = 2;
                    let call_cost = data.data.bet - data.data.player[data.data.betPos].cal;
                    data.data.player[data.data.betPos].stack -= call_cost;
                    data.data.amountOfPot += call_cost;
                    data.data.player[data.data.betPos].cal = data.data.bet;
                    axios.put('http://localhost:8080/api/board/callBetting',{
                        data:data.data //data.data로
                    }).then((response) => {
                        console.log('콜 전송!');
                        setData(response.data);
                        console.log(response.data);
                        // timeOut();
                    });
                }}>콜</button>
                <button id = "r2" className="raise" onClick={() => {
                    document.getElementById("f2").style.display='none';
                    document.getElementById("c2").style.display='none';
                    document.getElementById("r2").style.display='none';
                    setRbr(true);
                }}>레이즈</button>
                {rbr&&<input id ="rb1" type="range" name="number" min="10000" max="300000" step="1000"
                             onChange={onChangeRaise}/>}
                {rbr&&rangeBet2()}
            </div>
        )
    }
    const betBtn3 = () => {
        return (
            <div className="bet3">
                <button id="f3" className="fold" onClick={()=> {
                    document.getElementById("f3").style.display='none';
                    document.getElementById("all").style.diplay='none';
                    setFold(true);
                    foldCard();
                    data.data.player[data.data.betPos].fold = 1;
                    axios.put('http://localhost:8080/api/board/foldBetting',{
                        data:data.data //data.data로
                    }).then((response) => {
                        console.log('폴드데이터 전송!');
                        // response.data.data.player[response.data.data.betPos].fold = 1;
                        setData(response.data);
                        console.log(response.data);
                        //   timeOut();
                    });
                }}>폴드</button>
                <button id="all" className ="allIn" onClick={() => {
                    document.getElementById("f3").style.display='none';
                    document.getElementById("all").style.display='none';
                    setAll(true);
                    data.data.player[data.data.betPos].fold = 2;
                    data.data.player[data.data.betPos].cal += data.data.player[data.data.betPos].stack;
                    data.data.player[data.data.betPos].stack = 0;
                    axios.put('http://localhost:8080/api/board/callBetting', {
                        data:data.data
                    }).then((response) => {
                        console.log('올인!');
                        setData(response.data);
                        //  timeOut();
                    });
                }}>
                    올인</button>
            </div>
        )
    }
    const foldInput = () => { //폴드 상태 표시
        return (
            <button className="task-tooltip" id ="foldState">폴드</button>
        )
    }
    const callInput = () => { //콜 상태 표시
        return (
            <button className="task-tooltip" id ="callState">콜</button>
        )
    }
    const allInput1 = () => { //올인 상태 표시
        return (
            <button className="task-tooltip" id = "allState">{data.data.player[0].cal}</button>
        )
    }
    const allInput2 = () => { //올인 상태 표시
        return (
            <button className="task-tooltip" id = "allState">{data.data.player[1].cal}</button>
        )
    }
    const allInput3 = () => { //올인 상태 표시
        return (
            <button className="task-tooltip" id = "allState">{data.data.player[2].cal}</button>
        )
    }
    const allInput4 = () => { //올인 상태 표시
        return (
            <button className="task-tooltip" id = "allState">{data.data.player[3].cal}</button>
        )
    }
    const allInput5 = () => { //올인 상태 표시
        return (
            <button className="task-tooltip" id = "allState">{data.data.player[4].cal}</button>
        )
    }
    const allInput6 = () => { //올인 상태 표시
        return (
            <button className="task-tooltip" id = "allState">{data.data.player[5].cal}</button>
        )
    }
    const raiseInput1 = () => { //레이즈 상태 표시
        return (
            <button className="task-tooltip" id ="raiseState">{data.data.player[index].cal}</button>
        )
    }
    const raiseInput2 = () => { //레이즈 상태 표시
        return (
            <button className="task-tooltip" id ="raiseState">{data.data.player[(index+1)%data.data.total_player].cal}</button>
        )
    }
    const raiseInput3 = () => { //레이즈 상태 표시
        return (

            <button className="task-tooltip" id ="raiseState">{data.data.player[(index+2)%data.data.total_player].cal}</button>
        )
    }
    const raiseInput4 = () => { //레이즈 상태 표시
        return (
            <button className="task-tooltip" id ="raiseState">{data.data.player[(index+3)%data.data.total_player].cal}</button>
        )
    }
    const raiseInput5 = () => { //레이즈 상태 표시
        return (
            <button className="task-tooltip" id ="raiseState">{data.data.player[(index+4)%data.data.total_player].cal}</button>
        )
    }
    const raiseInput6 = () => { //레이즈 상태 표시
        return (
            <button className="task-tooltip" id ="raiseState">{data.data.player[(index+5)%data.data.total_player].cal}</button>
        )
    }
    const checkInput = () => { //체크 상태 표시
        return (
            <button className="task-tooltip"  id = " checkState">체크</button>
        )
    }

    const deleteState = () => {  //페이즈 변경시 배팅 상태 제거
        document.getElementById("foldState").style.display='none';
        document.getElementById("checkState").style.display='none';
        document.getElementById("callState").style.display='none';
        document.getElementById("allState").style.display='none';
        document.getElementById("raiseState").style.display='none';
    }
    return (
        <div>
            <SixTable images={images} setImages={setImages} cardImg={cardImg}
                      show={show} setShow={setShow} visible={visible} setVisible={setVisible}
                      playerCard1={playerCard1} playerCard2={playerCard2} playerCard3={playerCard3}
                      playerCard4={playerCard4} playerCard5={playerCard5} playerCard6={playerCard6}
                      reverseCard1={reverseCard1} reverseCard2={reverseCard2}
                      data={data} setData={setData} betBtn1={betBtn1} betBtn2={betBtn2} betBtn3={betBtn3}
                      phase3={phase3} phase4={phase4} phase5={phase5} time={time} start={start} foldInput={foldInput}
                      checkInput={checkInput} callInput={callInput} allInput1={allInput1} allInput2={allInput2}
                      allInput3={allInput3} allInput4={allInput4} allInput5={allInput5} allInput6={allInput6}
                      raiseInput1={raiseInput1} raiseInput2={raiseInput2} raiseInput3={raiseInput3} raiseInput4={raiseInput4} raiseInput5={raiseInput5}
                      raiseInput6={raiseInput6}
                      fold={fold} check={check} rai={rai} call={call} all={all} timer1={timer1} a={a} bet1={bet1} bet2={bet2}
                      bet3={bet3} bet4={bet4} bet5={bet5} bet6={bet6} phase6={phase6} user={user} playerBett={playerBett}
                      index={index}
            />
        </div>
    );
};
export default StartSix;