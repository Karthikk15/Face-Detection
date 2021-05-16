import React from 'react';
import './navigation.css'
const Navigation = ({ onRouterChange, isSignedIn }) => {
    if (isSignedIn) {
        return(
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p onClick={ () => {onRouterChange('signin')} } className='exit'>Sign Out</p>
            </nav>
                );    
    } else {
    return(
<nav style={{display:'flex', justifyContent:'flex-end'}}>
    <p onClick={ () => {onRouterChange('signin')} } className='exit'>Sign-in</p>
    <p onClick={ () => {onRouterChange('register')} } className='exit'>Register</p>
</nav>
    );
    }
}

export default Navigation;