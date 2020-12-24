import React from 'react';
import Tilt from 'react-tilt'
import brain from './brain.png';
import './logo.css';
const Logo = () => {
    return(
<div className='tilt-container'>
<Tilt className="Tilt" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
 <div>
 <img alt='brain' style={{width:'100px', height:'120px', paddingTop:'15px'}} src={brain} ></img>
 </div>
</Tilt>
</div>
    );
}

export default Logo;