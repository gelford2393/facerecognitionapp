import React from 'react'
import './facerecog.css'
const FaceRecognition = ({box, img}) => {
    console.log(box);

    return (
        <div className="center ma">
            <div className="mt2 absolute">
                <img id="inputImage" src={img} width='500px' height='auto' alt=""/>
                <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow}}></div>
            </div> 
        </div>
    )
}

export default FaceRecognition
