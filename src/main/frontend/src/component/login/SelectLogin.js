import React from 'react';
import Login from "./Login";
import './Login.css';
const SelectLogin = () => {
    return (
        <div>
            <div>
                <ul>
                    <li>
                        <div className = "loginInform">
                            <input
                                type="text"
                                placeholder="아이디를 입력하세요..."
                            />
                        </div>

                    </li>
                    <li>
                        <div className="loginInform">
                            <input
                                type ="text"
                                placeholder="비밀번호를 입력하세요..."
                            />
                        </div>

                    </li>
                    <div className = "btn">
                        <button>로그인</button>
                    </div>


                </ul>


            </div>

        </div>
    );
};

export default SelectLogin;