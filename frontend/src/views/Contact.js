import React from 'react'
import emailjs from "emailjs-com"

const Contact = () => {

    const submitMessage = event => {
        event.preventDefault()
        emailjs.sendForm("service_z2z2xyv", "template_mhggnrt", event.target, "0000upIERKZqY-Cqz")
        .then(res => {
            console.log(res)
        }).catch(err => console.log(err))
    }


  return (
      <form onSubmit={submitMessage}>
        <h1>SEND YOUR MESSAGE</h1>
        <div>
          <label>First Name</label>
          <input name="firstName"/>
        </div>
        <div>
          <label>Last Name</label>
          <input name="lastName"/>
        </div>
        <div>
          <label>Email</label>
          <input name="email"/>
        </div>
        <div>
          <label>Phone Number</label>
          <input name="phoneNumber"/>
        </div>
        <div>
          <label>Message</label>
          <textarea name="message" type="text"/>
        </div>

        <button>Submit</button>
    </form>
  )
}

export default Contact