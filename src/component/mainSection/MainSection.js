import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { boadeGet } from '../module/borderReducer';
import BorderList from './BorderList';
import './MainSection.css'
 
function MainSection(props) {
    
    const isLogin=props.isLogin;
    let button;
     
     if(isLogin){
        button=<button type="button" className="add_qna_btn" name="button">등록하기</button> 
     }

     const [initData,setInitData]=useState([]);
     const fetchUser=async()=>{
        axios.get('/main/board')
          .then(
              res =>  setInitData(res.data)
          ).catch(
              res=> console.log(res.error)
         )
     }
     

     useEffect(() => {
        const data=fetchUser();
      }, []);
    
      useEffect(()=>{
          dispatch(boadeGet(initData));
      },[initData])
      const dispatch = useDispatch();

      const {topics}=useSelector(state=> state.borderReducer);
      console.log(topics);

      const deletTest=(id)=>{
        axios.delete('/main/board/'+id)
        .then(
            res => setInitData(initData.filter(data=>data.id!==id))
        ).catch(
            res=> console.log(res.message)
         )
    
    }
    return (
        <div className='table_box'>
            <Link to="/insert">
            <div>   
                {/* <button type="button" className="add_qna_btn" name="button">등록하기</button>               */}
                {button}
            </div>
            </Link>

            <table border="1">
                <thead>
                    <tr>
                        <th className="qa_num">번호</th>
                        <th className="qa_num">작성자</th>
                        <th className="qa_info">제목</th>
                    </tr>
                </thead>
                <tbody className="qna_body">
                    {
                        topics.map((items,index)=>
                            <BorderList index={index+1}
                                        ids={items.id} 
                                        name={items.name}
                                        userId={items.user_id}
                                        title={items.title}
                                        key={items.id}
                                        deletTest={deletTest}></BorderList>
                        )
                    }
                   
                </tbody>
            </table>
        </div>
    );
}

export default MainSection;