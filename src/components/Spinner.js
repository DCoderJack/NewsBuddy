import React from 'react'
import  LoadingSpinner  from "./LoadingSpinner.gif";

const Spinner = () =>{
    return (
      <div className='text-center'>
        <img src={LoadingSpinner} alt="LoadingSpinner" />
      </div>
    )
  }

export default Spinner