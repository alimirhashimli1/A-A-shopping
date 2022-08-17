import React, { useState } from 'react'
import Classnames from "classnames"
import "./Burger.css"
const Burger = () => {
    const [open, setOpen]= useState(false)
  return (
    <div className='burger' open={open} onClick={()=> setOpen(!open)} >
    
    <div className={ Classnames('bar',{'bar-hidden': open } )}></div>
    <div className={ Classnames('bar',{'bar-hidden': open } )}></div>
    <div className={ Classnames('bar',{'bar-hidden': open } )}></div>
      
    </div>
  )
}

export default Burger
