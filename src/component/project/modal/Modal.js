import React, { useEffect, useRef, useState } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Modal.css';
import Slider from "react-slick";
import Card from '../piece/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faXmark, faXmarkSquare ,faBackwardFast,faStepBackward,faPlay,faStepForward,faFastForward,faPause} from '@fortawesome/free-solid-svg-icons';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import useInterval from 'react-useinterval';

function Modal(props) {
    const settings={
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    const data=props.data;

    const datas=[
        {
            id:1,
            src:"img/real1.png"
        },
        {
            id:1,
            src:"img/real2.png"
        },
        {
            id:1,
            src:"img/real3.png"
        },
        {
            id:1,
            src:"img/real4.png"
        },
        {
            id:1,
            src:"img/real5.png"
        },
    ]
    // const isMode=props.isMode;

    // const sliderRef=useRef();

    // console.log(isMode);

    // useEffect(()=>{
    //     if(isMode) sliderRef.current.slickPause();
    //     else sliderRef.current.slickPlay();
    // },[isMode])


    const [intervId,setInervId]=useState();
    const [checkePoints,setCheckPoints]=useState(0);

    useEffect(()=>{
        if(props.isAuto) changeImage();
    },[])

    const changeImage=()=>{
        if(!intervId){
            const count =datas.length;
            let checkePoint=0;

            let interveId=setInterval(()=>{
                imageBox.current.src=datas[checkePoint].src;
                checkePoint++;
                
                if(checkePoint===count&&props.isAuto) {
                    clearInterval(interveId);
                    setTimeout(() => {
                        props.changeStat();
                    }, 700);
                }else if(checkePoint===count&&!props.isAuto){
                    checkePoint=0;
                }
                setCheckPoints(checkePoint);
            },700);
            setInervId(interveId);
        }
    }


    const stopImage=()=>{
        clearInterval(intervId);
        setInervId(null);
    }


    let btn;
    if(!intervId){
        btn=   
        <button className='firsts buttons' onClick={changeImage}>
            <FontAwesomeIcon icon= {faPlay} size='lg'/>
        </button>
    }else{
        btn= 
        <button className='firsts buttons' onClick={stopImage}>
            <FontAwesomeIcon icon= {faPause} size='lg'/>
        </button>
    }
  


    const imageBox=useRef();

    const prevImg=e=>{
        let currentData;
        if(checkePoints===0) {
            currentData=datas[datas.length-1];
            setCheckPoints(datas.length-1);

        }else {
            currentData=datas[checkePoints-1];
            setCheckPoints(checkePoints-1);

        }
        const imgSrc=currentData.src;
        imageBox.current.src=imgSrc;
    }

    const nextImg=e=>{
        let currentData;
        if(checkePoints===datas.length-1) {
            currentData=datas[0];
            setCheckPoints(0);

        }else {
            currentData=datas[checkePoints+1];
            setCheckPoints(checkePoints+1);

        }
        const imgSrc=currentData.src;
        imageBox.current.src=imgSrc;
    }

    const moveFirst=e=>{
        imageBox.current.src=datas[0].src;
        setCheckPoints(0);
    }
    const moveLast=e=>{
        imageBox.current.src=datas[datas.length-1].src;
        setCheckPoints(datas.length-1);
    }

    
    

    return (
        // <div className='background'>
        //     <div className='modal'>zds
        //     <FontAwesomeIcon icon={faXmarkSquare}  size="2x" 
        //         onClick={props.changeStat}   color="#BDBDBD" className='xbox'/>
        //         <Slider {...settings}>
        //                     {data.map(item=>(
        //                            <Card id={item.id} src={item.src}/>
        //                     ))}
        //         </Slider>
        //     </div>
        // </div>
        <div className='background'>
            <div className='modals'>
            <FontAwesomeIcon icon={faXmarkSquare}  size="2x" 
                onClick={(e)=>{
                    props.changeStat(e);
                    stopImage()
                }}   color="#BDBDBD" className='xbox'/>
            <div className='cards'>
                <div className='settings_name'>
                    [GK2A AI RGB TURE] 2022-06-27 06:10 UTC(2022-06-27 15:10 KST) KMA
                </div>
                <div className='move_container'>
                    {/* <div>
                        <select className={'play_time_box ' +(intervId ? 'Pauseas':'')} disabled={intervId}>
                            <option value="1">최근 1시간</option>
                            <option value="2">최근 2시간</option>
                        </select>
                    </div> */}
                    <div className='button_container'>
                        <button className={'firsts buttons ' + (intervId ? 'Pauseas':'')} disabled={intervId} onClick={moveFirst}>
                            <FontAwesomeIcon icon= {faBackwardFast} size='lg'/>
                        </button>
                        <button className={'firsts buttons ' + (intervId ? 'Pauseas':'')} disabled={intervId} onClick={prevImg}>
                            <FontAwesomeIcon icon= {faStepBackward} size='lg'/>
                        </button>
                        {/* <button className='firsts buttons' onClick={startImage}>
                            <FontAwesomeIcon icon= {faPlay} size='lg'/>
                        </button> */}
                        {btn}
                        <button className={'firsts buttons ' + (intervId ? 'Pauseas':'')} disabled={intervId} onClick={nextImg}>
                            <FontAwesomeIcon icon= {faStepForward} size='lg'/>
                        </button>
                        <button className={'firsts buttons ' + (intervId ? 'Pauseas':'')} disabled={intervId} onClick={moveLast}>
                            <FontAwesomeIcon icon= {faFastForward} size='lg'/>
                        </button>
                    </div>
                  
                    <div className='sliderWrap'>
                        {/* <div className='silder'>
                            <div className='stepBar '>

                            </div>
                            <div className='stepDot'>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                                <i></i>
                            </div>
                        </div> */}
                        <span className='txtTime'>8:50</span>
                    </div>
                </div>
            
                
               <img className='project_img' alt={data[0].id}  src={`${process.env.PUBLIC_URL}/${datas[0].src}`} ref={imageBox}/>
            </div>

            </div>
        </div>
    );
}

export default Modal;