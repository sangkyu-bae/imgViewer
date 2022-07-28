import React, { useEffect, useRef } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Bottom.css';
import '../Project.css';
import Slider from "react-slick";
import Card from './Card';
function Bottom(props) {
    const data= props.data;

    const settings = props.settings;
     
    const isMode=props.isMode;

    const firstSlider=useRef();
    const scondSlider=useRef();
    const thirdSlider=useRef();

    useEffect(()=>{
        if(isMode){
            firstSlider.current.slickPause();
            scondSlider.current.slickPause();
            thirdSlider.current.slickPause();
        
        }else{
            //  firstSlider.current.slickPlay();
            //  scondSlider.current.slickPlay();
            //  thirdSlider.current.slickPlay();
        }
    },[isMode])


    return (
        <div className='img_container'>
            <div className='img_flex_box'>
                <div className='main_img_box borders_right'>
                    <Card id={data[0].id}  src={data[0].src} changeShowModal={props.changeShowModal}/>  
                </div>
                <div className='main_img_box scond_box'>
                     <div className='scond_main_img_box sss'>   
                        <Card id={data[0].id} src={data[0].src} changeShowModal={props.changeShowModal}/>  
                    </div>
                    <div className='scond_sub_img_box'>
                        <Card id={data[0].id} src={data[0].src} changeShowModal={props.changeShowModal}/>  
                    </div> 
                </div>
            </div>
        </div>
    );
}

export default Bottom;