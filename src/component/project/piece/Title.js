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
    const [NewImg,setNewImg]=useState('');
    
    useEffect(()=>{
        props.imgSrc.forEach(item=> {
            console.log(item.id);
        });
        if(props.imgSrc.length>1){
            setNewImg( <Slider {...settings}>
            {props.imgSrc.map(item=>(
                <Card id={item.id} src={item.src} changeShowModal={props.changeModal}/>
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
                <div className='main_img borders'>
                 {NewImg}
                </div>       
                <div className='main_imgs'>
                    <div className='scond_img_container'>
                        <div className='scond_first_img_box first'>
                             <Card id={data[0].id} src={data[0].src} changeShowModal={props.changeModal}/>
                        </div>   
                        <div className='scond_first_img_box scond'>
                         <Card id={data[0].id} src={data[0].src} changeShowModal={props.changeModal}/>  
                        </div>
                    </div>
                    <div className='scond_bottom_img_container'>
                        <div className='scond_bottom_img_box'>
                            <Card id={data[0].id} src={data[0].src} changeShowModal={props.changeModal}/>  
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Title;