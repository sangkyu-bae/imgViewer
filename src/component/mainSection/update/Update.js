import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Update(props) {
    let boardId=useParams();

    const [title,setTitle]=useState("");
    const [mainText,setMainText]=useState("");

    const [board,setBoard]=useState([]);

    const [isTitle,setIsTitle]=useState(false);
    const [isMainText,setIsMainText]=useState(false);

    const navigate=useNavigate();


    useEffect(()=>{
        const fetchUser=async()=>{
            axios.get('/api/Boards/'+boardId.boardId)
            .then(
                res =>setBoard(res.data)
            ).catch(
                res=> console.log(res.message)
             )
        };
        fetchUser();
    },[])

    useEffect(()=>{
        setTitle(board.title);
        setMainText(board.mainText);
    },[board])
    
    const changTitle =(e)=>{
        if(e.target.value.length<2)setIsTitle(true)
        else setIsTitle(false)

        setTitle(e.target.value)
    }

    const changeMainText =(e)=>{
        if(e.target.value.length<5)setIsMainText(true)
        else setIsMainText(false)

        setMainText(e.target.value)
    
    }


    const formCheck=e=>{
        e.preventDefault();
        if(isTitle) {
            alert("제목을 등록하세요");
            return false;
        }else if(isMainText){
            alert("내용을 등록하세요");
            return false;
        }

        axios.put('/api/Boards/'+boardId.boardId,{
            name:board.name,
            id:board.id,
            title:title,
            mainText:mainText
        }).then(
            res => navigate(`/main/${boardId.boardId}`)
        ).catch(
            res=> console.log(res.message)
        )

    }
    return (
        <div>
            <form onSubmit={formCheck}>
               <div>
                    <label for="type_2">제목</label>
                    <input type="text"
                           id="type_2"
                           name="title" 
                           className="n-radio"
                           value={title}
                           onChange={changTitle} 
                          />
                     {isTitle&&<div className="invalid-input">수정할 제목은 적어도 2자 이상입니다.</div>}     
                </div>
                <div>
                <label for="type_1">내용</label>
                    <textarea
                        id="type_1"
                        rows="10"
                        cols="68"
                        name="mainText"
                        placeholder="내용 입력"
                        value={mainText}
                        onChange={changeMainText}
                       />
                     {isMainText&&<div className="invalid-input">수정할 내용은 적어도 5자 이상입니다.</div>}    
                </div>
                <button>수정하기</button>
             </form>
        </div>
    );
}

export default Update;