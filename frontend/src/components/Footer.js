import React from 'react'
import "./footer.css"
import {Link} from "react-router-dom";
// import  from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import {  faYoutube, faFacebook, faInstagram, faTwitter, faLinkedin, faPhoenixSquadron } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer class="footer-distributed">
	    <section className='center-footer'>
	         <div class="footer-left">
                 <span className="my_shop-footer"><Link className='item-link my-shopping-logo' to="/"><span className='shopping-logo'>A&A</span> Shopping</Link></span>
                 <p class="footer-company-name">A&A Shopping © 2022</p>
             </div>
             <div class="footer-center">
			    <div>
				    <i><FontAwesomeIcon icon={faLocationDot} /></i>
	                <p><span>444 S. a&a shopping</span> Derfflinger Str, Hannover</p>
				</div>
	             <i><FontAwesomeIcon icon={faPhone} /></i>
	             <p>+1.555.555.5555</p>
             </div>
             <div class="footer-right">
                 <div class="footer-icons">
	                 <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
	                 <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
	                 <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
	                 <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
	                 <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
                 </div>
                 <div  className='support-email'>
	                 <i><FontAwesomeIcon icon={faEnvelope} /></i>    <a href="mailto:support@company.com"> ashopping@gemail.com</a>
                 </div>
             </div>
	    </section>

			

		</footer>
  )
}

export default Footer