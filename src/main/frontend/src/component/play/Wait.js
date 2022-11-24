import React,{useState} from 'react';
import './Wait.css';
import {useNavigate} from 'react-router';
import axios from 'axios';
const Wait = () => {
    const [board,setBoard] = useState();
    setInterval( async () => {
        await axios.put('http://localhost:8080/game/joinGame/1').then((res) => {
            console.log('board요청');
            setBoard(res.data);
        })
    },5000);
    const navigate = useNavigate();
    return (
        <div>
            {board&&board.data.total_player===1&&<div>
                <img className= "p1" src="/images/player1.png"/>
            </div>}
            {board&&board.data.total_player===2&&<div>
                <img className= "p1" src="/images/player1.png"/>
                <img className="p2" src="/images/player2.png"/>
            </div>}
            {board&&board.data.total_player===3&&<div>
                <img className= "p1" src="/images/player1.png"/>
                <img className="p2" src="/images/player2.png"/>
                <img className="p3" src="/images/player3.png"/>
            </div>}
            {board&&board.data.total_player===4&&<div>
                <img className= "p1" src="/images/player1.png"/>
                <img className="p2" src="/images/player2.png"/>
                <img className="p3" src="/images/player3.png"/>
                <img className="p4" src="/images/player4.png"/>
            </div>}
            {board&&board.data.total_player===5&&<div>
                <img className= "p1" src="/images/player1.png"/>
                <img className="p2" src="/images/player2.png"/>
                <img className="p3" src="/images/player3.png"/>
                <img className="p4" src="/images/player4.png"/>
                <img className="p5" src="/images/player5.png"/>
            </div>}
            {board&&board.data.total_player===6&&<div>
                <img className= "p1" src="/images/player1.png"/>
                <img className="p2" src="/images/player2.png"/>
                <img className="p3" src="/images/player3.png"/>
                <img className="p4" src="/images/player4.png"/>
                <img className="p5" src="/images/player5.png"/>
                <img className="p6" src="/images/player6.png"/>
            </div>}
            {board&&board.data.total_player>=2&&board.data.total_player<=6&&<button onClick={ () => {
                board.data.total_player===2&&navigate('/free');
                board.data.total_player===3&&navigate('/free');
                board.data.total_player===4&&navigate('/free');
                board.data.total_player===5&&navigate('/free');
                board.data.total_player===6&&navigate('/six');
            }
            }>게임시작</button>}
        </div>
    );
};

export default Wait;