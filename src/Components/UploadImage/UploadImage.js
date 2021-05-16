import React from 'react';
import './uploadImage.css'
const UploadImage = ({ onInputChange, onButtonSubmit }) => {
    return(
<div className='uploadImage'>
    <p>{'App, helps to detect the faces from the image.'}</p>
    <div className='arrange'>
        <div className='form shadow'>
            <input onChange = {onInputChange} style={{width:'60%',margin:'15px',height:'22px'}} type='text'></input>
            <button onClick = {onButtonSubmit} style={{width:'15%',height:'30px',backgroundColor:'rgb(54,180,223, 0.5)'}}>Detect</button>
        </div>
    </div>
</div>
    );
}

export default UploadImage;