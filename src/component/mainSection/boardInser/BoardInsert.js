import axios from 'axios';
import React, {  useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import './BoardInsert.css';
function BoardInsert(props) {
    const testName=sessionStorage.getItem("user");
    
    
    

    const [name,setName]=useState("");
    const [title,setTitle]=useState("");
    const [text,setText]=useState("");

    const [isName,setIsName]=useState(false);
    const [isText,setIsText]=useState(false);
    const [isTitle,setIsTitle]=useState(false);

    const navigate=useNavigate();

    const changeName =(e)=> {
        if(e.target.value.length<2) setIsName(true);
        else setIsName(false)
        setName(e.target.value);
    }

    const changText =(e)=>{
        if(e.target.value.length<5) setIsText(true);
        else setIsText(false);
        setText(e.target.value);
    }

    const changTitle=e=>{
        if(e.target.value.length<2) setIsTitle(true);
        else setIsTitle(false);
        setTitle(e.target.value);
    }

    const checkForm =()=>{
        // if(isName||name=='') {
        //     alert("작성자를 등록하세요");
        //     return false;
        // }else

    //    if(isText||text==''){
    //         alert("내용을 등록하세요");
    //         return false;
    //    }else if(isTitle==title==''){
    //        alert("제목을 등록하세요")
    //        return false;
    //    } 

        if(isTitle||title==''){
            console.log(title);

            alert("제목을 등록하세요");
            return false;
        }else if(isText||text==''){
            alert("내용을 등록하세요");
            return false;
        }
       return true
    }

    const insertData=(e)=>{
        e.preventDefault();
        const check=checkForm();
        
        // const name= e.target.name.value;
        // const mainText=e.target.mainText.value;
        // const title=e.target.title.value;
        const id=sessionStorage.getItem('id');
        const name=sessionStorage.getItem("user");
      
        if(!id){
            alert("로그인 되어 있지 않습니다.");
            navigate("/login");
        }else{
            if(check){
                axios.post('/main/board',{
                    name:name,
                    title:title,
                    mainText:text,
                    userId:id
                }).then(
                    res => {
                        if(res.data.errno){
                            alert("등록사항이 잘못되었습니다.");
                        }else {
                            navigate("/");
                        }
                    }
                ).catch(
                    res=> {
                        console.log(res.message)
                    }

                )
            }
        }
   
    }

    const offInsert=()=>navigate('/')

    const [imgSrc,setImgSrc]=useState("");
    const [files,setFiles]=useState("");

    const onLoadFile=e=>{
        const file =e.target.files;
        console.log(file[0]);
        setFiles(file[0]);
        
        const reader=new FileReader();
        reader.readAsDataURL(file[0]);

        reader.onload=()=>{
            setImgSrc(reader.result);
        }
    }
   
    useEffect(()=>{

    })

    return (
        <div className='insert_container'>
            <div className='insert_box'>
                <form onSubmit={insertData}>
                    {/* <div>
                        <label for="type_0">작성자</label>
                        <input type="text"
                            id="type_0"
                            name="name" 
                            className="n-radio"
                                value={name}
                                onChange={changeName}
                            />
                            {isName && <div className="invalid-input">작성자의 이름은 적어도 2자 이상입니다.</div>}
                            
                    </div> */}
                    <div className='ele_box'>
                        <label className='title_head' htmlFor="type_2">제목</label>
                        <input type="text"
                            id="type_2"
                            name="title" 
                            className="n-radio"
                            maxLength="15"
                            placeholder='15자 이내 입력'
                                value={title}
                                onChange={changTitle}
                            />
                           
                    </div>
                    {isTitle && <div className="invalid-input">제목은 적어도 2자 이상입니다.</div>}
                    <div className='text_box'>
                    <label  className='title_head' htmlFor="type_1">내용</label><br/>
                        <textarea
                            id="type_1"
                            rows="10"
                            cols="68"
                            name="mainText"
                            placeholder="내용 입력"
                            onChange={changText}
                            value={text}
                        />
                        {isText && <div className="invalid-input">내용은 적어도 5자 이상입니다.</div>}
                    </div>
                    <div className='file_box'>
                        <div>
                         <input type="file" id="image" accept='img/*' onChange={onLoadFile}/>
                        </div> 
                        <div className='images'>
                            {imgSrc && <img src={imgSrc} alt="testview"/>}
                        </div>
                    </div>
                    

                    <div className='btn_box'>
                        <button onClick={offInsert} className='off_insert' type="button">취소</button>
                        <button type="submit" className='add_iinsert_box'>등록하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BoardInsert;