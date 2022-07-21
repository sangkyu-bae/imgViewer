import React, {  useEffect, useRef, useState } from 'react';
import Bottom from './piece/Bottom';
import Title from './piece/Title';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Project.css';
import Slider from "react-slick";
import Modal from './modal/Modal';
import Card from './piece/Card';
import {HubConnectionBuilder,LogLevel} from '@microsoft/signalr';
import moment from 'moment';
import useInterval from 'react-useinterval';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import Spiner from './modal/Spiner';
import 'bootstrap/dist/css/bootstrap.min.css';

function Project(props) {

    
    const [ktcTime,setKtcTime]=useState('');
    const [utcTIme,setUtcTIme]=useState('');
    const [isModal,setIsModal]=useState(false);
    const [isMode,setIsMode]=useState(false);

    const [isAuto,setIsAuto]=useState(true);
    const [isStart,setIsStart]=useState(false);

    const [isLoding,setIsLoding]=useState(true);



    const [settings,setSettings]=useState({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    });
    
    useInterval(()=>{
        let ktcDay = moment().format('YYYY-MM-DD HH:mm:ss');
        const utcDay = moment().utc().format('YYYY-MM-DD HH:mm:ss');
        setKtcTime(ktcDay);
        setUtcTIme(utcDay);
    },1000)

    useEffect(()=>{
        console.log(isStart);
        if(isAuto&&isStart&&!isModal){
            setTimeout(() => {
                changeShowModal();
            }, 700);
        }
    },[isModal])

 
    /*signalr */
    const testSignalR=async(user,room)=>{
        try{
            const connection=new HubConnectionBuilder()
            .withUrl("https://localhost:5001/test")//서버주소 
            .configureLogging(LogLevel.Information)
            .build();

            connection.on("ReceiveMessage",(user,message)=>{
                // if(message){
                //     console.log("message 전송됨");
                // }
                console.log("message recive : ",message);
                
            });
            await connection.start();
            await connection.invoke("TestMessage",{user,room});

        }catch(e){
          console.log(e);
        }
    }
    useEffect(()=>{
        testSignalR("test","test");
    },[])
    /*signalR */
 
    /*테스트 데이터*/
    const topData=[
        {
            id:1,
            src:"img/real1.png"
        },
        {
            id:2,
            src:"img/test.jpg"
        },
        {
            id:3,
            src:"img/test7.jpg"
        }
    ]

    const bottomData=[
        {
            id:4,
            src:"img/real2.png"
        },
        {
            id:5,
            src:"img/test2.jpg"
        },
        {
            id:6,
            src:"img/test3.jpg"
        }
    ]
    
    const changeShowModal =()=> {
        if(isAuto&&!isStart)setIsStart(true);
        setIsModal(true);
    }

    const changehiddenModal=e=>{
        if(e&&isStart) setIsStart(false);
        setIsModal(false);
    }
    /* 수정중 */
    const nextId=useRef(2);
    const [imgData,setImgData]=useState();
    const [imgSrc,setimgSrc]=useState([
        {
            id:1,
            src:"img/real1.png"
        }
    ])

    const [testArr,setTestArr]=useState([

    ]);

    const getImages=()=>{
        const url='api/image';
        axios.get(url)
            .then(
                res=>{
                    let img = res.data.split("'");
                    setImgData(img[1]); 
                    const imgDat={
                        id:nextId.current,
                        src:img[1]
                    };
                    setimgSrc([...imgSrc,imgDat]);
                    setIsLoding(false);
               
                } 
            ).catch(
                res=>console.log(res.message)
            )
    }
    const changeImg=()=> {
        if(imgSrc.length>1){
            const img=imgSrc.filter(imgs=>imgs.id==nextId.current);
            img[0].id=1;
            setimgSrc(img);
        }
    }
  
    
    /* 수정중 */

    useEffect(()=>{
        getImages();
    },[])

    return (
        
        <div className='containsr'>
          {isLoding ? <Spiner/> : <></>}
            <div className='option_box'>
                <div className='option_checkbox'>
                    <div className='scond_boxs'>
                        <div className='text_box'>
                            <span className='span_co'><span className='blue_text'>UTC</span> {utcTIme} </span>
                            <span className='span_co'><span className='blue_text'>KST</span> {ktcTime}</span>
                        </div>
                    </div>
                </div>
            </div>
     
            <div className='project_container'>
                <div className='project_img_box'>
                    <Title data={topData} settings={settings} imgSrc={imgSrc} changeImg={changeImg} 
                    imgData={imgData} isMode={isMode} changeModal={changeShowModal} ></Title>
                    <Bottom data={bottomData} isMode={isMode} changeShowModal={changeShowModal} ></Bottom>
                </div>
                <div className='project_side_box'>
                    <Card id={topData[0].id} src={topData[0].src} changeShowModal={changeShowModal}/>
                </div>
            </div>
            {isModal && (
                <Modal changeStat={changehiddenModal} isAuto={isAuto} isMode={isMode} data={bottomData} />
            )}
        </div>
    );
}

export default Project;