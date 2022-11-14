import React, {useEffect, useState} from 'react';
import axios from "axios";

const Server = () => {

    const [data,setData] = useState(null);//useEffect로 지정시 실행시 자동 요청  , 버튼으로 하고싶으면 버튼 내에서 onClick으로 호출?
    useEffect(()=> {
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => {
                setData(response.data);
            })

    },[]);
    if(data) {
        return (
            <div>
                {alert('가져온데이터: '+data.id)}
            </div>

        );
    }
    else {
        return (
            <div>
                {alert('loading...')}
            </div>
            )

    }
};

export default Server;