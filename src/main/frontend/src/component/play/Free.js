import React, {useState,useEffect} from 'react';
import './Free.css';
import axios from 'axios';
import Bet from './Bet';
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
        receiveData();
    },[]);

    //?????? ?????? ????????? ?????? ?????? ?????????
    const [data,setData] = useState();
    const receiveData = ()=>{   //????????? ????????? ??????
        axios.get('https://jsonplaceholder.typicode.com/todos/1').then((reponse) => {
            console.log('???????????????!');
            setData(reponse.data);
        });
    }
    //????????? 2?????? ????????? ????????? ??????(??????)
    const sendData = () => {   //?????? ?????????
        axios.post('https://jsonplaceholder.typicode.com/todos/1', {
            cardNumber
        }).then(response => {
            console.log(response)
        })
    }
    const handleclickRandom1 = (e) =>{
        document.getElementById("img1").src = images[data.id].src; //?????? ????????? ???????????????-> data.card1
    }
    const handleclickRandom2 = (e) => {
        document.getElementById("img2").src = images[data.id].src; //?????? ????????? ??????????????? -> data.card2
    }
    const [cardNumber,setcardNumber] = useState({   //????????? 2?????? ?????? ????????? ????????? ??????
        card1:"",
        card2:"",
    });

    const handleClick1 = (e) => {   //?????? ????????? ???????????? ???????????? ,?????? ??????????????? ?????? ?????? ??????
        document.getElementById("img1").src = images[cardNumber.card1].src;
    }
    const handleClick2 = (e) => {  //?????? ????????? ???????????? ????????????
        document.getElementById("img2").src = images[cardNumber.card2].src;
    }
    const onChangeAccount = (e) => {     //2?????? ????????? ?????? ????????? ???????????? ??????
        setcardNumber({
            ...cardNumber,[e.target.name] : e.target.value,
        })
    }
    return (
        <div>
            <div>
                <img className ="gamer2_1" src ="/images/player.png"/>
            </div>
            <div>
                <img className ="gamer2_2" src ="/images/player.png"/>
            </div>
            <div className = "set pullDown">
                <img className="c2" src ="/images/backimage.png"/>
                <img className="c2" src ="/images/backimage.png"/>
                <img className="c2" src ="/images/backimage.png"/>
                <img className="c2" src ="/images/backimage.png"/>
                <img className="c2" src ="/images/backimage.png"/>
            </div>
            <div className="card pullDown">
                <img id ="img1" src ="/images/backimage.png"/>
                <img id ="img2" src ="/images/backimage.png"/>
            </div>
            <div className="reverse" >
                <button
                    onClick={()=> {
                        console.log(data);
                        handleclickRandom1()
                        handleclickRandom2()
                    }}>?????? ?????????</button>
                <div className="bet">
                    <Bet/>
                </div>
            </div>

        </div>

    );
};
export default Free;