import React from 'react';
import './Hello.css';
import './Animation.css';
import {Link} from "react-router-dom";
const Hello = () => {

    return (
        <body>
            <div className="back">
                <video className="helloVideo" src ="/videos/casino.mp4" muted autoPlay loop/>
                <Link to ="/main">
                    <div className="text">
                        <p className="pulse">
                            Click To Start
                        </p>
                    </div>
                </Link>
            </div>

        </body>










    );
};

export default Hello;