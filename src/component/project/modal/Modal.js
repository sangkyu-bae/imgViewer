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
    const [intervId,setInervId]=useState();
    const [checkePoints,setCheckPoints]=useState(0);
    const [imgData,setImgData]=useState([]);

    useEffect(()=>{
        setImgData(props.imageData);
    },[])
    useEffect(()=>{
        if(imgData.length>0){
            changeImage();
        }
    },[imgData])

    const changeImage=()=>{ 

        if(!intervId){
            const count =imgData.length;
            let checkePoint=0;
           
            let interveId=setInterval(()=>{
                imageBox.current.src=imgData[checkePoint].imgHtml;
                checkePoint++;
                
                if(checkePoint===count&&props.isAuto) {
                    clearInterval(interveId);
                    setTimeout(() => {
                        props.changeCheckCount();
                        props.changehiddenModal(); 
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

    const prevImg=()=>{
        let currentData;
        if(checkePoints===0) {
            currentData=imgData[imgData.length-1];
            setCheckPoints(imgData.length-1);
        }else {
            currentData=imgData[checkePoints-1];
            setCheckPoints(checkePoints-1);
        }
        const imgSrc=currentData.imgHtml;
        imageBox.current.src=imgSrc;
    }

    const nextImg=()=>{
        let currentData;
        if(checkePoints===imgData.length-1) {
            currentData=imgData[0];
            setCheckPoints(0);
        }else {
            currentData=imgData[checkePoints+1];
            setCheckPoints(checkePoints+1);
        }
        const imgSrc=currentData.imgHtml;
        imageBox.current.src=imgSrc;
    }

    const moveFirst=()=>{
        imageBox.current.src=imgData[0].imgHtml;
        setCheckPoints(0);
    }
    const moveLast=()=>{
        imageBox.current.src=imgData[imgData.length-1].imgHtml;
        setCheckPoints(imgData.length-1);
    }

    return (
        <div className='background'>
            <div className='modals'>
            <FontAwesomeIcon icon={faXmarkSquare}  size="2x" 
                onClick={(e)=>{
                    props.changehiddenModal(e);
                    stopImage()
                }}   color="#BDBDBD" className='xbox'/>
            <div className='cards'>
                <div className='settings_name'>
                    [GK2A AI RGB TURE] 2022-06-27 06:10 UTC(2022-06-27 15:10 KST) KMA
                </div>
                <div className='move_container'>
                    <div className='button_container'>
                        <button className={'firsts buttons ' + (intervId ? 'Pauseas':'')} disabled={intervId} onClick={moveFirst}>
                            <FontAwesomeIcon icon= {faBackwardFast} size='lg'/>
                        </button>
                        <button className={'firsts buttons ' + (intervId ? 'Pauseas':'')} disabled={intervId} onClick={prevImg}>
                            <FontAwesomeIcon icon= {faStepBackward} size='lg'/>
                        </button>
                        {btn}
                        <button className={'firsts buttons ' + (intervId ? 'Pauseas':'')} disabled={intervId} onClick={nextImg}>
                            <FontAwesomeIcon icon= {faStepForward} size='lg'/>
                        </button>
                        <button className={'firsts buttons ' + (intervId ? 'Pauseas':'')} disabled={intervId} onClick={moveLast}>
                            <FontAwesomeIcon icon= {faFastForward} size='lg'/>
                        </button>
                    </div>
                  
                    <div className='sliderWrap'>
                        <span className='txtTime'>8:50</span>
                    </div>
                </div>
                {imgData.length>0?
                    <img className='project_img'src={imgData[0].imgHtml} ref={imageBox}/> :null
                }
            </div>

            </div>
        </div>
    );
}

export default Modal;