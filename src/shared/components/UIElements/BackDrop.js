import React from 'react';
import ReactDom from 'react-dom';
import './BackDrop.css';
const Backdrop = props => {

    let back_drop = <div className='backdrop' onClick={props.onClick}></div>;
    return (ReactDom.createPortal(back_drop, document.getElementById('backdrop-hook')));
};

export default Backdrop;