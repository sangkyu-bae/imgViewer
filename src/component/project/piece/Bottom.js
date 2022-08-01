import React, { useEffect, useRef, useState } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Bottom.css';
import '../Project.css';
import Slider from "react-slick";
import Card from './Card';
function Bottom(props) {
    const data=props.data;
    const settings = props.settings;
    const [NewImg,setNewImg]=useState('');
    const [imgData,setImgData]=useState([]);

    useEffect(() =>{
        setImgData(props.initImgData);
    },[props.initImgData])

    useEffect(()=>{
        if(props.imgSrc.length>1){
            setNewImg( <Slider {...settings}>
            {props.imgSrc.map(item=>(
                <Card id={item.id} src={item.src} changeShowModal={props.changeModal} getImages={props.getImages} />
          ))}
      </Slider>)
            setTimeout(()=>{
                props.changeImg()
            },4500);
        }else{
            setNewImg(<Card id={data[0].id} src={props.imgData} changeShowModal={props.changeModal}/> )  
        }
    },[props.imgSrc])

    return (
        <div className='img_container'>
            <div className='img_flex_box' >
                <div className='main_img_box borders_right' onClick={()=>{ 
                    props.changePayLoad("goci2Fd")
                    props.getImages("/api/image")
                    } }>
                        {
                            Object.keys(imgData).length>0?
                            <Card id={data[0].id} src={imgData.goci2Fd.imgHtml} changeShowModal={props.changechangeModal} />:null
                        }
                </div>
                <div className='main_img_box scond_box'>
                     <div className='scond_main_img_box sss' onClick={()=>{ 
                    props.changePayLoad("goci2Ral")
                    props.getImages("/api/image")
                    } }>
                        {
                            Object.keys(imgData).length>0?
                            <Card id={data[0].id} src={imgData.goci2Ral.imgHtml} changeShowModal={props.changechangeModal} />:null
                        }
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