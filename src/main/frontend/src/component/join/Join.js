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

    return (
        <div className="loginBody">
            <div className="loginBody2">
                <div className="loginForm">
                    <h1 className="header">회원가입</h1>
                    <label className="loginLabel">ID</label>
                    <input className="loginInput"
                           type = "id"
                           placeholder="아이디를 입력하세요"
                           onChange={onChangeId}
                    />
                    <label className="loginLabel">
                        Password</label>
                    <input className="loginInput"
                           type = "password"
                           placeholder="비밀번호를 입력하세요"
                           onChange={onChangePasswd}
                    />
                    <p className="goJoin" onClick={() => {
                        navigate('/login');
                    }}>이미 회원이신가요?</p>
                    <button  className="loginBtn" onClick={ async () => {
                        await axios.post('http://localhost:8080/api/player', {
                            data: {
                                "username":username,
                                "password":password
                            }
                        },{allowCredentials:true}).then((response) => {
                            console.log('회원가입 정보 전송');
                            setPlayer(response.data);
                            console.log(response.data.data);
                            if(response.data.data.board===null) {
                                alert('회원가입 완료');
                                navigate("/main");
                            }
                            else
                                alert('이미 등록된 아이디 입니다.');
                        });
                    }}>회원가입완료</button>
                </div>
            </div>

        </div>
    );
};
export default Join;