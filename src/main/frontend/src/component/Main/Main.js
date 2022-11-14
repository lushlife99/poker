import React from 'react';
import {Link} from "react-router-dom";
import './Main.css';
const Main = () => {
    return (
        <body>
            <div className="background">
                <video className="mainVideo" src ="/videos/card.mp4" muted autoPlay loop/>
                <div className="mainPage">
                    <Link to ="/free">
                        <p>게임시작</p>
                    </Link>
                    <Link to ="/join">
                        <p>회원가입</p>
                    </Link>
                    <Link to = "/login">
                        <p>로그인</p>
                    </Link>
                </div>
            </div>
        </body>

    );
};

export default Main;