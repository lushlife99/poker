import React,{useState} from 'react';
import './Join.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Join = () => {
    const [username,setId] = useState();
    const [password,setPasswd] = useState();
    const [player,setPlayer] = useState();
    const navigate = useNavigate();

    const onChangeId = (e) => {
        setId(e.target.value);
    }
    const onChangePasswd = (e) => {
        setPasswd(e.target.value);
    }
    const existPlayer = () => {
        if(player&&player.data!==null) {
            alert('회원가입 완료');
            navigate('/main');
        }

        else
            alert('회원가입 실패');
    };
    return (
        <div>
            <div className="join">
                회원가입
            </div>
            <input
                type = "id"
                placeholder="아이디를 입력하세요."
                onChange={onChangeId}
            />
            <input
                type = "password"
                placeholder="비밀번호를 입력하세요."
                onChange={onChangePasswd}
            />
            <button onClick={async () => {
                await axios.post('http://localhost:8080/api/player', {
                    data: {
                        "username":username,
                        "password":password
                    }
                }).then((response) => {
                    console.log('회원가입 정보 전송');
                    setPlayer(response.data);
                    console.log(response.data);
                });
                existPlayer();
            }}>회원가입완료</button>
        </div>
    );
};
export default Join;