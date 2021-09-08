import React from 'react'
import './imagelinkform.css'
const ImageLinkForm = (props) => {
    return (
        <div className="f3 tc">
            <p>{'This Magic Brain will detect faces in your pictures. Give it a try!'}</p>
            <div className="center ">
            <div className='pa3 br3 shadow-5 center form'>
                <input className="f4 pa2 w-70 center" type="text" onChange={props.onInputChange}/>
                <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-blue color-black"
                onClick={props.onSubmit}
                >Detect</button>
            </div>
            </div>
            
        </div>
    )
}

export default ImageLinkForm
