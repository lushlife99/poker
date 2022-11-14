import React, {useState} from 'react';
import Poker from './Poker';
import axios from 'axios';
const Buyin = (props) => {
    const [stack,setStack] = useState();
    const onChangeStack = (e) => {     //2개의 입력한 카드 숫자를 받아오는 함수
        setStack(e.target.value)
    }
    return (
        <div>
            <div className="buyin">
                <input
                    type="number"
                    placeholder="스택 얼마나 구매?"
                    onChange={onChangeStack}
                    value={stack}
                />
                <button onClick={(e)=> {
                    console.log(stack) //전송할 stack값 확인 위함
                    e.preventDefault();
                    e.currentTarget.disabled = true;
                    axios.put('https://jsonplaceholder.typicode.com/todos/1',{
                        stack:stack,   //stack 전송
                    })
                    props.setShow(false);
                }}>완료</button>
            </div>
        </div>
    );
};

export default Buyin;