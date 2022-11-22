import React from 'react';
import {Link} from "react-router-dom";

const Game = () => {

    return (
        <div className="background">
            <video className="mainVideo" src="/videos/card.mp4" muted autoPlay loop/>
            <div className="mainPage">
                <Link to="/wait">
                    <p onClick={() => {
                    }}>게임시작</p>
                </Link>
                <Link to="/logout">
                    <p>로그아웃</p>
                </Link>
            </div>
        </div>
    );
};

export default Game;