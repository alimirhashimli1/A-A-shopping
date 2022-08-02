import React from 'react'
import "./footer.css"
// import  from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import {  faYoutube, faFacebook, faInstagram, faTwitter, faLinkedin, faPhoenixSquadron } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer class="footer-distributed">

			<div class="footer-left">

				<h3>Company<span>logo</span></h3>

				<p class="footer-links">
					<a href="#" class="link-1">Home</a>
					
					<a href="#">Blog</a>
				
					<a href="#">Pricing</a>
				
					<a href="#">About</a>
					
					<a href="#">Faq</a>
					
					<a href="#">Contact</a>
				</p>

				<p class="footer-company-name">Company Name © 2015</p>
			</div>

			<div class="footer-center">

				<div>
					<i><FontAwesomeIcon icon={faLocationDot} /></i>
					<p><span>444 S. Cedros Ave</span> Solana Beach, California</p>
				</div>

				<div>
					<i><FontAwesomeIcon icon={faPhone} /></i>
					<p>+1.555.555.5555</p>
				</div>

				<div>
					<i><FontAwesomeIcon icon={faEnvelope} /></i>
					<p><a href="mailto:support@company.com">support@company.com</a></p>
				</div>

			</div>

			<div class="footer-right">

				<p class="footer-company-about">
					<span>About the company</span>
					Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
				</p>

				<div class="footer-icons">

					<a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
					<a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
					<a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
					<a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
					<a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>


				</div>

			</div>

		</footer>
  )
}

export default Footer