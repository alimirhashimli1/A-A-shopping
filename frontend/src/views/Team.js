import React from "react";
import "./team.css";
import abdullah from "../assets/Abdullah.png";
import ali from "../assets/Ali.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faInstagram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Team = () => {
  return (
    <>
    {/* CONTAINER */}
     <section className="team-cover-section">
            <article className="team-article-container">
                <div className="team-section-header">
                    <h2 className="section-title"><span>Our</span> Team</h2>
                    <p className="section-text">This website was developed by two developers. You can contact them using social media accounts</p>
                </div>
                <div className="team-container">

                {/* IMAGES */}
                    <figure className="team-section top-to-bottom-effect">
                        <div className="team-img">
                            <img src={abdullah} alt=""/>
                            <div className="team-img-icon">
                                <a href="#"><i className="fab fa-facebook" target="_blank"></i></a>
                                <a href="https://www.linkedin.com/in/abdullah-al-tareb-27683710b/" target="_blank" ><i className="fab fa-linkedin"></i></a>
                                <a href=""><i className="fab fa-google-plus" target="_blank"></i></a>
                            </div>
                        </div>
                        <div className="team-img-desc">
                            <h3>Abdullah Al-Tareb</h3>
                            <p>Web Developer</p>
                        </div>
                    </figure>

                    <figure className="team-section team-center top-to-bottom-effect">
                        <div className="team-img">
                            <img src={ali} alt=""/>
                            <div className="team-img-icon">
                                <a href="#"><i className="fab fa-facebook" target="_blank"></i></a>
                                <a href="https://www.linkedin.com/in/ali-mirhashimli-197480121/" target="_blank"><i className="fab fa-linkedin"></i></a>
                                <a href=""><i className="fab fa-google-plus" target="_blank"></i></a>
                            </div>
                        </div>
                        <div className="team-img-desc">
                            <h3>Ali Mirhashimli</h3>
                            <p>Web Developer</p>
                        </div>
                    </figure>

                


                  

                </div>

            </article>
        </section>

    </>
  );
};

export default Team;
