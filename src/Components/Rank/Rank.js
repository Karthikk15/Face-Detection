import React from 'react';
import './rank.css';
const Rank = ({name, entries}) => {
    return(
   <div className='rank'>
       <p>Hi {name}, You have detected around..</p>
            <div className='facesCount'>
                <span>#{entries} </span>
                <span> faces!</span>
            </div>
   </div>
    );
}

export default Rank;