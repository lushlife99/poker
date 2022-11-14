import React from 'react';
import {Link} from "react-router-dom";
import './Navigator.css';

const Navigator = () => {
    return (
        <div className ="main">
            <ul>
                <li>
                    <Link to="/join">
                        <div className="btn">
                            <button className="btnstyle">
                                회원가입
                            </button>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to ="/login">
                        <div className="btn">
                            <button className="btnstyle">
                                로그인
                            </button>
                        </div>
                        
                    </Link>
                </li>
                <li>
                    <Link to ="/play">
                        <div className ="btn">
                            <button className="btnstyle">
                                게임 시작
                            </button>
                        </div>
                    </Link>
                </li>
                <li>
                    <Link to ="/server">
                        <div className="btn">
                            <button className="btnstyle">
                                서버 통신 연습
                            </button>
                        </div>
                    </Link>
                </li>




            </ul>
        </div>
    );
};

export default Navigator;