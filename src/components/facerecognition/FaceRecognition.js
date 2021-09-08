import React from 'react'

const FaceRecognition = (props) => {
    return (
        <div className="center ma">
            <div className="mt2 absolute">
                <img src={props.img} width='500px' height='auto' alt=""/>
            </div> 
        </div>
    )
}

export default FaceRecognition
