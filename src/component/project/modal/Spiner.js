import React from 'react';
import './Spiner.css';
function Spiner(props) {
    return (
        <div id='spiners' className="d-flex justify-content-center">
            <div 
                className="spinner-border text-primary"
                role="status"
                style={{width: '11rem', height: '11rem'}}
             >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default Spiner;