import React from 'react'

const Rank = (props) => {
    console.log(props);
    return (
        <div>
            <div className='white f3 tc'>
                 <p>{props.name}, your current rank is....</p>
            </div>
            <div className='white f1 tc'>
                 {props.entries}
            </div>
        </div>
        
    )
}

export default Rank
