import React, {useCallback,useEffect, useState,useRef} from 'react';
import axios from 'axios';

import Free from './Free';

const StartTwo = () => {
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
    const [visible,setVisible] = useState(true);  //?????? ?????????????????? ?????????
    const [show,setShow] = useState(false); //?????? ????????? ?????? ?????????
    const [data,setData] = useState(null);
    const [bet,setBet] = useState(false);
    const [betDiff,setDiff] = useState(false);
    const getData = async () => {
        const datas = await axios.put('http://localhost:8080/board/gameStart/1');
        setData(datas.data);
    };
    useEffect(() => {
        getData();
    },[]);
    const reverseCard1 = () => { //?????? ?????? ??? ??????????????? ?????? ?????????
        setTimeout(function() {
            document.getElementById("img2M1").src =images[data.data.player[0].card1].src;  //card.data.player[0].card1
            // console.log(data.id);
        },1500);
    }//?????? ?????? ??? ??????????????? ?????? ?????????
    const reverseCard2 = () => {
        setTimeout(function () {
            document.getElementById("img2M2").src= images[data.data.player[0].card2].src;  //card.data.player[0].card2
        },1900);
    }
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
    const playerCard1 = () => {  //player1 card1 , card2
        return (
            <div className="g2p1">
                <img id ="img2D1" src ="/images/backimage.png"/>
                <img id ="img2D2" src ="/images/backimage.png"/>
            </div>
        )
    }
    const playerCard2 = () => { //player2 card1 , card2
        return (
            <div className="g2p2">
                <img id ="img2M1" src ="/images/backimage.png"/>
                <img id ="img2M2" src ="/images/backimage.png"/>
            </div>
        )
    }
    return (
        <div>
            <Free visible={visible} setVisible={setVisible} show={show} setShow={setShow} cardImg={cardImg}
                  playerCard1={playerCard1} playerCard2={playerCard2} data={data} setData={setData}
                  reverseCard1={reverseCard1} reverseCard2={reverseCard2} images={images} setImages={setImages}
                  bet={bet} setBet={setBet} betDiff={betDiff} setDiff={setDiff}/>
        </div>
    );
};

export default StartTwo;