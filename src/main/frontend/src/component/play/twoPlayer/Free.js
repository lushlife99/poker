import React, {useState,useEffect} from 'react';
import './Free.css';
import {Link} from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router';

const Free = () => {
    const id =1;
    const [data,setCard] = useState();

    const navigate = useNavigate();

    return (
        <div>
            <div className="w2p1">
                <img className="gamerW2_1" src="/images/player.png"/>
            </div>
            <div className = "pad">
                <button onClick={() => {
                     navigate("/twoGame");


                }}>게임시작</button>
            </div>
            <div className ="w2p2">
                <img className="gamerW2_2" src="/images/player.png"/>
            </div>
        </div>
    );
};
export default Free;