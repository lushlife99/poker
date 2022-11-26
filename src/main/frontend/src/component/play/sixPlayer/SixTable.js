import React, {useState,useEffect} from 'react';
import './SixTable.css';
import axios from "axios";
const SixTable = (props) => {
    const {images,setImage,cardImg,show,setShow,visible,setVisible,
        playerCard1,playerCard2,playerCard3,playerCard4,playerCard5,playerCard6,
        data,setData,reverseCard1,reverseCard2,betBtn1,betBtn2,betBtn3,phase3,phase4,phase5,time,start,
        callInput,foldInput,allInput1,allInput2,allInput3,allInput4,allInput5,allInput6
        ,checkInput,raiseInput1,raiseInput2,raiseInput3,raiseInput4,raiseInput5
        ,raiseInput6,cnt,check,call,rai,all,fold,timer1,a,bet1,bet2,bet3,bet4,bet5,bet6,phase6,index,playerBett,user
    } = props;

    return (


        <div className="board">

            {data&&console.log(index+"111")}
            <div className="w2p1">
                <div className="g1">
                    <img className="gamerW2_1" src="/images/player1.png"/>
                    {data&&(data.data.player[(index+4)%data.data.total_player].fold==1)&&foldInput()}
                    {data&&(data.data.player[(index+4)%data.data.total_player].fold==2)&&allInput5()}
                    {data&&(data.data.player[(index+4)%data.data.total_player].jokBo==2)&&callInput()}
                    {data&&(data.data.player[(index+4)%data.data.total_player].jokBo==3)&&raiseInput5()}
                    {data&&(data.data.player[(index+4)%data.data.total_player].jokBo==4)&&checkInput()}
                    {show&&playerCard1()}

                </div>

                <div className="g2">
                    <img className="gamerW2_1" src="/images/player2.png"/>
                    {data&&(data.data.player[(index+3)%data.data.total_player].fold==1)&&foldInput()}
                    {data&&(data.data.player[(index+3)%data.data.total_player].fold==2)&&allInput4()}
                    {data&&(data.data.player[(index+3)%data.data.total_player].jokBo==2)&&callInput()}
                    {data&&(data.data.player[(index+3)%data.data.total_player].jokBo==3)&&raiseInput4()}
                    {data&&(data.data.player[(index+3)%data.data.total_player].jokBo==4)&&checkInput()}

                    {show&&playerCard2()}
                </div>
                <div className="g3">
                    <img className="gamerW2_1" src="/images/player3.png"/>
                    {data&&(data.data.player[(index+2)%data.data.total_player].fold==1)&&foldInput()}
                    {data&&(data.data.player[(index+2)%data.data.total_player].fold==2)&&allInput3()}
                    {data&&(data.data.player[(index+2)%data.data.total_player].jokBo==2)&&callInput()}
                    {data&&console.log(data)&&(data.data.player[(index+2)%data.data.total_player].jokBo==3)&&raiseInput3()}
                    {data&&(data.data.player[(index+2)%data.data.total_player].jokBo==4)&&checkInput()}
                    {show&&playerCard3()}
                </div>
            </div>
            {visible&&<button className="fixedBtn" onClick={ () => {
                setShow(true); //버튼 누를시 카드 5장 보이게
                setVisible(false); //버튼 클릭시 게임시작 버튼 사라지게함
                console.log('카드 데이터 요청');
                reverseCard1(); //자기 카드1 뒤집기
                reverseCard2(); //자기 카드2 뒤집기
                start();
            }}>게임시작</button>}
            {show&&cardImg()}
            <div className ="w2p2">
                <div className ="g4">
                    <img className="gamerW2_2" src="/images/player4.png"/>
                    {data&&(data.data.player[(index+5)%data.data.total_player].fold==1)&&foldInput()}
                    {data&&(data.data.player[(index+5)%data.data.total_player].fold==2)&&allInput6()}
                    {data&&(data.data.player[(index+5)%data.data.total_player].jokBo==2)&&callInput()}
                    {data&&(data.data.player[(index+5)%data.data.total_player].jokBo==3)&&raiseInput6()}
                    {data&&(data.data.player[(index+5)%data.data.total_player].jokBo==4)&&checkInput()}

                    {show&&playerCard4()}

                </div>
                <div className="g5">
                    <img className="gamerW2_2" src="/images/player5.png"/>
                    {show&&data&&timer1()}
                    {data&&(data.data.player[(index)%data.data.total_player].fold==1)&&foldInput()}
                    {data&&(data.data.player[(index)%data.data.total_player].fold==2)&&allInput1()}
                    {data&&(data.data.player[(index)%data.data.total_player].jokBo==2)&&callInput()}
                    {data&&(data.data.player[(index)%data.data.total_player].jokBo==3)&&raiseInput1()}
                    {data&&(data.data.player[(index)%data.data.total_player].jokBo==4)&&checkInput()}

                    {show&&playerCard5()}
                    {data&&(data.data.player[index].id===parseInt(document.cookie.at(9))&&playerBett())}


                </div>
                <div className="g6">
                    <img className="gamerW2_2" src="/images/player6.png"/>
                    {data&&(data.data.player[(index+1)%data.data.total_player].fold==1)&&foldInput()}
                    {data&&(data.data.player[(index+1)%data.data.total_player].fold==2)&&allInput2()}
                    {data&&(data.data.player[(index+1)%data.data.total_player].jokBo==2)&&callInput()}
                    {data&&(data.data.player[(index+1)%data.data.total_player].jokBo==3)&&raiseInput2()}
                    {data&&(data.data.player[(index+1)%data.data.total_player].jokBo==4)&&checkInput()}

                    {show&&playerCard6()}




                </div>
            </div>
            {phase3()}
            {phase4()}
            {phase5()}
            {phase6()}

        </div>
    );
};
export default React.memo(SixTable);