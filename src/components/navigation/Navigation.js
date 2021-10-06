import React from 'react'
import './navigation.css'
const Navigation = (props) => {
    if (props.route === 'home') {
        return (
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p onClick={() => props.onRouteChange('signout')} className="f3 link dim black underline pa3 pointer">Sign Out</p>
            </nav>
        ) 
    } else {
        return (
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p onClick={() => props.onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Signin</p>
                <p onClick={() => props.onRouteChange('register')} className="f3 link dim black underline pa3 pointer">Register</p>
            </nav>
            )
    }
}

export default Navigation
