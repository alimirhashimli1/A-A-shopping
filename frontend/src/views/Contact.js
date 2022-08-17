import emailjs from "emailjs-com"
import "./contact.css"
import { useState } from "react"

const Contact = ({message, messageClick}) => {


    const submitMessage = event => {
        event.preventDefault()
        emailjs.sendForm("service_z2z2xyv", "template_mhggnrt", event.target, "0000upIERKZqY-Cqz")
        .then(res => {
            console.log(res)
        }).catch(err => console.log(err))
    }

 

  return (
    <>
    <div className="contact-container">   

    <div className="contact-section">
     
    <div class="contact-info">
        <div><i className="fas fa-map-marker-alt"></i>Address, City, Country</div>
        <div><i className="fas fa-envelope"></i>contact@email.com</div>
        <div><i className="fas fa-phone"></i>+00 0000 000 000</div>
        <div><i className="fas fa-clock"></i>Mon - Fri 8:00 AM to 5:00 PM</div>
      </div>
      <div className="contact-form">
        <h2 className="contact-form-title">Contact Us</h2>
        <form className="contact" onSubmit={submitMessage}>
          <input type="text" name="name" className="text-box" placeholder="Your Name" required/>
          <input type="email" name="email" className="text-box" placeholder="Your Email" required/>
          <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
          <button onClick={messageClick} type="submit" name="submit" className="contact-button" value="Send">SEND</button>
        </form>
      </div>
    </div>
    </div>
    </>
  )
}

export default Contact