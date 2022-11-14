import React from 'react';
import './Login.css';
import {Link} from "react-router-dom";
const Login = () => {
    return (
        <div>
            <div className="login">
                로그인
            </div>
            <hr/>
            <div>
                <ul>
                    <li>
                        <Link to="/loginselect">
                            <div className ="btn">
                                <button>일반로그인</button>
                            </div>

                        </Link>

                    </li>
                    <li>
                        <div className ="btn">
                            <button>카카오로그인</button>
                        </div>

                    </li>
                </ul>
            </div>




        </div>

    );
};

export default Login;