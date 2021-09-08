import React from 'react'
import Tilt from 'react-tilt'
import './logo.css'
import  Brain from './brain.png'
const Logo = () => {
    return (
        <div>
            <Tilt className="Tilt ma3 br2 shadow-2" options={{ max : 45 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner tc"><img style={{ paddingTop: '30px'}} src={Brain} alt="brain" /> </div>
            </Tilt>
        </div>
    )
}

export default Logo
