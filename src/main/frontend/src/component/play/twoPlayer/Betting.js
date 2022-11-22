import React from 'react';

const Betting = (props) => {
    const {data} = props;
    const betBtn1 = () => {
        return (
            <div className="bet1">
                <button id="f" className="fold" onClick={()=> {
                    alert('폴드');
                    document.getElementById("f").style.display='none';
                    document.getElementById("c").style.display='none';
                    document.getElementById("r").style.display='none';
                    /*axios.put('http://localhost:8080/api/board/foldBetting',{
                        data:{data}
                    }).then(() => {
                        console.log('데이터 전송!');
                    });*/
                    //data.id=2;
                    //console.log(data.id);
                }}>폴드</button>
                <button id = "c" className="check" onClick={() => {
                    document.getElementById("f").style.display='none';
                    document.getElementById("c").style.display='none';
                    document.getElementById("r").style.display='none';
                }}>체크</button>
                <button id = "r" className="raise" onClick={() => {
                    document.getElementById("f").style.display='none';
                    document.getElementById("c").style.display='none';
                    document.getElementById("r").style.display='none';
                }}>레이즈</button>
            </div>
        )
    }
    return (
        <div>
            {betBtn1()}
            {console.log(data)}
        </div>
    );
};

export default Betting;