import React, { useEffect, useRef, useState } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Title.css';
import '../Project.css';
import { jsx, css } from '@emotion/react'
import Slider from "react-slick";
import Card from './Card';

function Title(props) {
    const data=props.data;
    const settings = props.settings;
    // const imgData=props.initImgData;
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
        <div className='img_box'>
            <div className='dispaly_flex'>
                <div className='main_img borders' onClick={()=>{ 
                    props.getImages("/api/image")
                    props.changePayLoad("amiEla")
                    } }>
                        {
                            Object.keys(imgData).length>0?
                            <Card id={data[0].id} src={imgData.amiEla.imgHtml} changeShowModal={props.changechangeModal} />:null
                        }
                </div>       
                <div className='main_imgs'>
                    <div className='scond_img_container'>
                        <div className='scond_first_img_box first' onClick={()=>{ 
                            props.getImages("/api/image")
                            props.changePayLoad("amiFd")
                        } }>
                            {
                                Object.keys(imgData).length>0? 
                                <Card id={data[0].id} src={imgData.amiFd.imgHtml} changeShowModal={props.changechangeModal} />:null
                            }
                        </div>   
                        <div className='scond_first_img_box scond' onClick={()=>{ 
                            props.getImages("/api/image")
                            props.changePayLoad("amiLa")
                        } }>
                            {
                                Object.keys(imgData).length>0? 
                                <Card id={data[0].id} src={imgData.amiLa.imgHtml} changeShowModal={props.changechangeModal} />:null
                            }
                        </div>
                    </div>
                    <div className='scond_bottom_img_container'>
                        <div className='scond_bottom_img_box'onClick={()=>{ 
                            props.getImages("/api/image")
                            props.changePayLoad("gems")
                        } }>
                            {
                                Object.keys(imgData).length>0? 
                                <Card id={data[0].id} src={imgData.gems.imgHtml} changeShowModal={props.changechangeModal} />:null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Title;