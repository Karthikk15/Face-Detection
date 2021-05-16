import React from 'react';
const FaceRecognition = ( {isfaceDetectionFailed,  imageURL}) => {
    return(
        <div style= {{display:'flex', justifyContent:'center'}}>
            <img id='face' style={{width:'500px', height:'auto'}} alt='facepick' src= {imageURL}></img>
            <canvas style ={{position:'absolute'}} id='face-detect'></canvas>
        </div>
    );
}

export default FaceRecognition;