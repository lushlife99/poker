import React, {useState,useEffect} from 'react';
import './Free.css';
import axios from 'axios';
import Bet from './Bet';
import Bet2 from './Bet2';
import CreateCard from '../card/CreateCard';
const Free = () => {
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
    useEffect(()=> {
        receiveData(); //게임 시작 우선순위, 플레이어번호, 카드1,2 ,
    },[]);

    //카드 번호 입력후 요청 관련 함수들
    const [data,setData] = useState();
    const receiveData = ()=>{   //서버에 데이터 요청
        axios.put('http://localhost:8080/game/joinGame/1').then((reponse) => {
            console.log('데이터요청!');
            console.log(reponse);
            setData(reponse.data);
        });
    }
    //입력한 2개의 데이터 서버에 요청(등록)
    const sendData = () => {   //아직 미지수
        axios.post('https://jsonplaceholder.typicode.com/todos/1', {
            cardNumber
        }).then(response => {
            console.log(response)
        })
    }
    const [cardNumber,setcardNumber] = useState({   //입력한 2개의 카드 숫자가 저장될 공간
        card1:"",
        card2:"",
    });
    const handleClick1 = (e) => {   //내가 입력한 카드숫자 뒤집는것 ,잠깐 랜덤확인을 위해 변수 변경
        document.getElementById("img1").src = images[cardNumber.card1].src;
    }
    const handleClick2 = (e) => {  //내가 입력한 카드숫자 뒤집는것
        document.getElementById("img2").src = images[cardNumber.card2].src;
    }
    setTimeout(function() {
        document.getElementById("img2M1").src =images[data.data.player[1].card1].src;  //인덱스는 받아온데이터 card1으로 수정
    },1000);  //게임 시작 후 프리플랍시 카드 뒤집기
    setTimeout(function() {
        document.getElementById("img2M2").src= images[data.data.player[1].card2].src;
    },1200); //게임 시작 후 프리플랍시 카드 뒤집기
    return (
        <div>
            <div className="g2p1">
                <img className="gamer2_1" src="/images/player.png"/>
                <img id ="img2D1" src ="/images/backimage.png"/>
                <img id ="img2D2" src ="/images/backimage.png"/>
                <Bet2/>
            </div>
            <div className = "set2 pullDown">
                <img id="rc2_1" className="c2" src ="/images/backimage.png"/>
                <img id="rc2_2" className="c2" src ="/images/backimage.png"/>
                <img id="rc2_3" className="c2" src ="/images/backimage.png"/>
                <img id="rc2_4" className="c2" src ="/images/backimage.png"/>
                <img id="rc2_5" className="c2" src ="/images/backimage.png"/>
            </div>
            <div className ="g2p2">
                <img className="gamer2_2" src="/images/player.png"/>
                <img id ="img2M1" src ="/images/backimage.png"/>
                <img id ="img2M2" src ="/images/backimage.png"/>
                <Bet/>
            </div>
            {alert(data.data.player[0].username)}

        </div>
    );
};
export default Free;