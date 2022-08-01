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
                console.log("message recive : ",message,user);
                
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

    useEffect(()=>{
        if(isAuto&&isStart&&!isModal){
            setTimeout(() => {
                changeShowModal();
            }, 700);
        }
    },[isModal])

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
    const [imgData,setImgData]=useState([]);
    /* 화면에 뿌려질 데이터 */
    const [initImgData,setInItImgData]=useState([]);

    const [imgSrc,setimgSrc]=useState([
        {
            id:1,
            src:"img/real1.png"
        }
    ])
    /* 모달에 넘겨줄 데이터 */
    const [modalData,setModalData]=useState([]);
    /* 모든 동영상 실행을 위한 이미지데이터 */
    const [imageData,setImageData]=useState([]);
    /* amifd 데이터 */
    const [amiFd,setAmiFd]=useState([]);
    /* amiEla 데이터*/
    const [amiEla,setAmiEla]=useState([]);
    /* amiLa 데이터 */
    const [amiLa,setAmiLa]=useState([]);
    /* goic2Fd 데이터 */
    const [goic2Fd,setGoic2Fd]=useState([]);
    /* goci2Ral 데이터 */
    const [goci2Ral,setGoci2Ral]=useState([]);
    /* gems 데이터 */
    const [gems,setGems]=useState([]);


    /* 탑재체 확인 */
    const [payload,setPayload]=useState('');
    /* 오토모드시 반복 회수 확인 */
    const checkAutoImgCount=useRef(0);
    /* 반복 횟수 변경 */
    const changeCheckCount=()=> {
        if(Object.keys(imageData).length-1==checkAutoImgCount.current) checkAutoImgCount.current=0;
        else checkAutoImgCount.current++;
        checkAutoModalData();
    }

    const changePayLoad=(checkpayload)=>setPayload(checkpayload) 
    useEffect(()=>{
        console.log(payload);
    },[payload])                              
    const getImages=(url)=>{
        if(imageData.length===0){
            setIsLoding(true);
            axios.get(url)
                .then(
                    res=>{
                        setIsLoding(false);
                        if(url==="/init")checkModalandSetData(res.data,true);
                        else checkModalandSetData(res.data,false);

                        console.log(res.data);
                    } 
                ).catch(
                    res=>console.log(res.message)
                )
        }else{
            checkAutoModalData();
        }
    }
    useEffect(()=>{
        let imageDataLength=Object.keys(imageData).length;
        if(imageDataLength>0){
            checkAutoModalData();
        }
    },[imageData])

    const checkAutoModalData=()=>{
        if(isAuto){
          let key=Object.keys(imageData)[checkAutoImgCount.current];
          setModalData(imageData[key]);
        }else{ 
           if(payload==='amiFd'){
                setModalData(amiFd);
            }else if(payload==='amiEla'){
                setModalData(amiEla);
            }else if(payload==='amiLa'){
                setModalData(amiLa);
            }else if(payload==='gems'){
                setModalData(gems);
            }
        }
        changeShowModal()
     }

    const checkModalandSetData=(imgData,isInit)=>{
        if(isInit){
            changeImgBase64Tag(imgData,true);
            setInItImgData(imgData);
        }else{
            //이미지 데이터 들어올시 변화하는 코드 수정 필요
            changeImgBase64Tag(imgData,false);
            setImageData(...imageData,imgData);
            setAmiFd(...amiFd,imgData.amiFd); 
            setAmiEla(...amiEla,imgData.amiEla); 
            setAmiLa(...amiLa,imgData.amiLa);
            setGoci2Ral(...goci2Ral,imgData.goci2Ral);
            setGoic2Fd(...goic2Fd,imgData.goic2Fd);
            setGems(...gems,imgData.gems);
        }
    }

    const changeImgBase64Tag=(data,isInit)=>{
        if(isInit){
            for(let key in data){
                const value=data[key]
                value.imgHtml=value.imgHtml.split("'")[1];
            }
        }else{
            for(let key in data){
                const value = data[key];
                for(let subkey in value){
                    const values = value[subkey];
                    values.imgHtml= values.imgHtml.split("'")[1];
                }
            }
        }
      
    }

    const changeImg=()=> {
        if(imgSrc.length>1){
            const img=imgSrc.filter(imgs=>imgs.id==nextId.current);
            img[0].id=1;
            setimgSrc(img);
        }
    }
    const changeMode=e=>{
        let changeId=e.target.id;
        if(changeId=='stop_btn') setIsAuto(false);
        else setIsAuto(true);
    }


    useEffect(()=>{
        getImages('/init');
    },[])     


    return (
        
        <div className='containsr'>    
          {isLoding ? <Spiner/> : <></>}
            <div className='option_box'>
                <div className='option_checkbox'>
                    <div className='scond_boxs'>
                        <div className='btn_group'>
                            <div className='first_boxs'>
                                <button id='stop_btn' className={!isAuto?'active':''} onClick={changeMode}>수동</button>
                                <button id='start_btn'className={isAuto?'active':''} onClick={changeMode}>자동</button> 
                            </div>
                        </div>
                        <div className='text_box'>
                            <span className='span_co'><span className='blue_text'>UTC</span> {utcTIme} </span>
                            <span className='span_co'><span className='blue_text'>KST</span> {ktcTime}</span>
                        </div>
                    </div>
                </div>
            </div>
     
            <div className='project_container'>
                <div className='project_img_box'>
                    <Title data={topData} settings={settings} imgSrc={imgSrc} changeImg={changeImg} imgData={imgData}
                     initImgData={initImgData} changeModal={changeShowModal} getImages={getImages} changePayLoad={changePayLoad}></Title>
                    <Bottom data={bottomData}  settings={settings} changeShowModal={changeShowModal} initImgData={initImgData}
                    changeModal={changeShowModal} getImages={getImages} changePayLoad={changePayLoad}></Bottom>
                </div>
                <div className='project_side_box'>
                    <Card id={topData[0].id} src={topData[0].src} changeShowModal={changeShowModal}/>
                </div>
            </div>
          
            {isModal && (
               <Modal imageData={modalData} changehiddenModal={changehiddenModal} 
                        isAuto={isAuto} payload={payload} changeCheckCount={changeCheckCount}></Modal>
            )}
        </div>
    );
}

export default Project;