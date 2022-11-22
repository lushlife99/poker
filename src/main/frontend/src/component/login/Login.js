import React,{useState} from 'react';
import './Login.css';
import {Link,useNavigate} from "react-router-dom";
import axios from 'axios';
import {useCookies} from 'react-cookie';
const Login = () => {
    const [inputId,setInputId] = useState();
    const [inputPw,setInputPW] = useState();
    const [user,setUser] = useState();
    const [cookies,setCookie, removeCookie] = useCookies();
    const navigate = useNavigate();
    const handleInputId = (e) => {
        setInputId(e.target.value);
    }
    const handleInputPw = (e) => {
        setInputPW(e.target.value);
    }

    const clickLogin = () => {
        if(!(user&&user.data!==null)) {
            alert('로그인 완료!');
            navigate("/game");
        }
        else
            alert('로그인 실패!');
    }
    return (
        <div>
            <div className="login">
                로그인
            </div>
            <label>ID</label>
            <input
                type = "id"
                placeholder="Enter username"
                onChange={handleInputId}
            />
            <label>Password</label>
            <input
                type = "password"
                placeholder="Enter password"
                onChange={handleInputPw}
            />
            <button onClick={ async () => {
                await axios.put('http://localhost:8080/api/player/login',{
                    data:{
                    "username":inputId,
                    "password":inputPw
                        }
                },{withCredentials : true}).then((res) => {
                        console.log(res.data.data.id);
                        setUser(res.data);
                        setCookie('playerID',res.data.data.id);
                        removeCookie("id123213");
                    });
                clickLogin();
            }}>로그인</button>
        </div>
    );
};

export default Login;