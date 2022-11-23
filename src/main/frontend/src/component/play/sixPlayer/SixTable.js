import React, {useState} from 'react';
import './SixTable.css';
import axios from "axios";
const SixTable = (props) => {
    const {images,setImage,cardImg,show,setShow,visible,setVisible,
        playerCard1,playerCard2,playerCard3,playerCard4,playerCard5,playerCard6,
        data,setData,reverseCard1,reverseCard2,betBtn1,betBtn2,betBtn3,phase3,phase4,phase5} = props;
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
                </div>
                <div className="g2">
                    <img className="gamerW2_1" src="/images/player2.png"/>
                    {show&&playerCard2()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[3].id)&&data.data.bet==0&&betBtn1()}

                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[3].id)&&data.data.bet!=0&&
                        (data.data.player[data.data.betPos].stack > data.data.bet-data.data.player[data.data.betPos].cal)&&betBtn2()}

                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[3].id)&&
                        (data.data.bet-data.data.player[data.data.betPos].cal>=data.data.player[data.data.betPos].stack)&&betBtn3()}
                </div>
                <div className="g3">
                    <img className="gamerW2_1" src="/images/player3.png"/>
                    {show&&playerCard3()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[2].id)&&data.data.bet==0&&betBtn1()}

                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[2].id)&&data.data.bet!=0&&
                        (data.data.player[data.data.betPos].stack > data.data.bet-data.data.player[data.data.betPos].cal)&&betBtn2()}

                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[2].id)&&
                        (data.data.bet-data.data.player[data.data.betPos].cal>=data.data.player[data.data.betPos].stack)&&betBtn3()}
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
                </div>
                <div className="g5">
                    <img className="gamerW2_2" src="/images/player5.png"/>
                    {show&&playerCard5()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[0].id)&&data.data.bet==0&&betBtn1()}

                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[0].id)&&data.data.bet!=0&&
                        (data.data.player[data.data.betPos].stack > data.data.bet-data.data.player[data.data.betPos].cal)&&betBtn2()}

                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[0].id)&&
                        (data.data.bet-data.data.player[data.data.betPos].cal>=data.data.player[data.data.betPos].stack)&&betBtn3()}
                </div>
                <div className="g6">
                    <img className="gamerW2_2" src="/images/player6.png"/>
                    {show&&playerCard6()}
                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[1].id)&&data.data.bet==0&&betBtn1()}

                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[1].id)&&data.data.bet!=0&&
                        (data.data.player[data.data.betPos].stack > data.data.bet-data.data.player[data.data.betPos].cal)&&betBtn2()}

                    {show&&data&&(data.data.player[data.data.betPos].id==data.data.player[1].id)&&
                        (data.data.bet-data.data.player[data.data.betPos].cal>=data.data.player[data.data.betPos].stack)&&betBtn3()}
                </div>
            </div>
            {phase3()}
            {phase4()}
            {phase5()}
        </div>
    );
};
export default SixTable;