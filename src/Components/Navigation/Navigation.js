import React from 'react';
import './navigation.css'
const Navigation = () => {
    return(
<nav style={{display:'flex', justifyContent:'flex-end'}}>
    <p className='exit'>Sign Out</p>
</nav>
    );
}

export default Navigation;