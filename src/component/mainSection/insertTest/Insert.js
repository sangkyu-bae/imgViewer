import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Insert.css';
function Insert(props) {
    const navigate=useNavigate();

    const offInsert =()=>navigate('/');
    const [imgSrc,setImgSrc]=useState(false);
    const [img,setImg]=useState([]);
    const handleFormSubmit=(e)=>{
        e.preventDefault();
        addTestImg();
    }

    const addTestImg=()=>{
        const url='/main/test-img';
        console.log(img);

        const userId= sessionStorage.getItem("id");
        console.log(userId);

        const form= new FormData();
        form.append('img',img);
        form.append("userId",userId);

        const config={
            Headers:{
                'content-type':'multipart/form-data'
            }
        }

        axios.post(url,form,config)
            .then(
                res=> console.log("sucss")
            ).catch(
                res=>console.log("err")
            )
    }

    const onLoadFile=(e)=>{
        const file =e.target.files;

        setImg(e.target.files[0]);
        console.log(e.target.files[0]);

        const reader=new FileReader();
        reader.readAsDataURL(file[0]);
        
        reader.onload=()=>{
            console.log(reader.result);
            setImgSrc(reader.result);
        }
    }


    
    return (
        <div className='insert_container'>
            <div className='insert_box'>
                <form onSubmit={handleFormSubmit}>
                    <div className='file_box'>
                        <div>
                         <input type="file" id="image" accept='img/*' onChange={onLoadFile}/>
                        </div> 
                        <div className='images'>
                            {imgSrc && <img src={imgSrc} alt="testview"/>}
                        </div>
                    </div>
                    

                    <div className='btn_box'>
                        <button  onClick={offInsert} className='off_insert' type="button">취소</button>
                        <button type="submit" className='add_iinsert_box'>등록하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Insert;