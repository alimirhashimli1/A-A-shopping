import React from 'react'
import "./contact.css"

const ContactMessage = ({setMessage}) => {
  const returnMain = () => {
    setMessage(false)
  }

  return (
    <div className="contact-container">   

    <div className="contact-message">
    <h2 className="contact-form-title">THANK YOU FOR YOUR MESSAGE!</h2>
    <h3 className="contact-form-message">Our team will read your message and return back to you soon!</h3>
    <button onClick={returnMain} className='contact-button contact-button-message'><a href="/">RETURN TO MAIN PAGE</a></button>
    </div>
    </div>
  )
}

export default ContactMessage