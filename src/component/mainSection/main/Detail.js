import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  Link, useNavigate, useParams } from 'react-router-dom';
import './Detail.css';
function Detail(props) {
    let boardId=useParams();
    console.log(boardId)
    const [board,setBoard]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchUser=async()=>{
            axios.get('/main/board/'+boardId.userId)
            .then(
                res =>setBoard(res.data)
            ).catch(
                res=> console.log(res.message)
             )
        };
        fetchUser();
    },[])

    const {topics}=useSelector(state=> state.borderReducer);
    console.log(topics);
    
    const deletTest=(id)=>{
        axios.delete('/api/Boards/'+id)
        .then(
            res =>navigate("/") 
        ).catch(
            res=> console.log(res.message)
         )
    
    }

    const name = sessionStorage.getItem('user');
    const userId=sessionStorage.getItem('id');
    let btn;
    if(userId===board.user_id){
        btn=    <div>
        <Link to={`/mainUpdate/${boardId.user_id}`}>
        <button >수정</button>
        </Link>
        <button onClick={()=>deletTest(board.id)}>삭제</button>
    </div>
    }


    return (
        <div className='order_ul_box'>
            <div>
                <ul className="box_receiver_info">
                    <li className='cell_discount_tit'>제목</li>
                    <li className="cell_discount_detail">{board.title}</li>
                </ul>
                <ul className="box_receiver_info">
                    <li className="cell_discount_tit">내용</li>
                    <li className="cell_discount_detail">{board.main_text}</li>
                </ul>
            </div>
            {btn}
           
        </div>

    );

}

export default Detail;