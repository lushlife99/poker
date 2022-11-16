import React from 'react';
import Bet2 from '../Bet2';
import {useNavigate} from 'react-router';

const WaitTwo = () => {
    const navigate = useNavigate();
    setTimeout(() => {
        alert('컴퓨터 체크');
        navigate("/twoGame");
    },6000);
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
            </div>
        </div>
    );
};

export default WaitTwo;