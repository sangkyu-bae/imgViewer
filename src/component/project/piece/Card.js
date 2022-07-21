import React from 'react';
import './Card.css';

function Card(props) {
    return (
        <div className='card' onClick={props.changeShowModal} key={props.id}>
            <span className='ele_time block'>
                <span className='utc_time block'>
                    <span>utc 2022-06-16 01:56:05</span>
                </span>
                <span className='kst_time block'>
                    <span>kst 2022-06-16 10:56:20</span>
                </span>
            </span>
            <img className='project_img' alt={props.id}  src={props.src}/>
        </div>
    );
}

export default Card;