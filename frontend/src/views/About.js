import React from "react";
import "./about.css";
import shopping from "../assets/shopping.jpg"
import about from "../assets/about-photo.jpg"

const About = () => {
  return (
    <>
	<div className="about-container">
      <section className="about">
		<div className="main">
      <img src={shopping} alt="" />
			<div className="about-text">
				{/* ABOUT */}
				<div className="about-h2-container">
				<h2>ABOUT <span>US</span> </h2>

				

				</div>
				<p>We are a commercial website called A&A shopping. We can provide clean code and pixel perfect design. We also make the website more  more interactive with web animations.We can provide clean code and pixel perfect design. We also make the website more  more interactive with web animations.A responsive design makes your website accessible to all users, regardless of their device.totam voluptatibus quam dolore nostrum. Voluptatum atque molestias blanditiis perferendis inventore necessitatibus eos placeat!
				Adipisci, nisi! Rerum atque error repellendus quasi deleniti ipsam debitis praesentium eius! Id minima natus quas voluptates a itaque suscipit enim quod ad, temporibus, dolorem quaerat repellendus laboriosam sed sunt!
				Doloremque quaerat reiciendis reprehenderit dolores delectus earum nihil saepe perspiciatis fuga? Sit mollitia commodi assumenda unde. Itaque placeat et facere omnis cum aliquid reiciendis, debitis aperiam quibusdam molestias, quasi quia!
				Ea maiores nulla quibusdam voluptatem numquam sit molestias quia repellat fugit, at totam? Ullam error distinctio quis, reiciendis animi earum quaerat ad porro pariatur illum iusto adipisci veritatis laudantium optio?
				Inventore omnis, iste fuga aliquid et vitae sit numquam saepe a sunt nulla ullam consectetur officiis, quo quasi eveniet mollitia illum nobis quidem ab doloribus non libero. Nihil, esse laboriosam?
				Laboriosam a quasi perspiciatis suscipit accusantium aliquid delectus odio, ad, sit aperiam assumenda dolore voluptatibus, necessitatibus facilis fugiat? Rerum perferendis explicabo dolor provident laudantium corrupti sapiente nobis aut deleniti? Voluptatem.</p>
				<button className="about-button" type="button"><a href="/contact">CONTACT US</a></button>

			</div>
		</div>
	</section>
	<section className="about">
		<div className="main">
			<div className="about-text">
				{/* HISTORY */}
			<div className="about-h2-container">
				<h2><span>OUR</span>  HISTORY </h2>
				</div>
				<p>We are a commercial website called A&A shopping. We can provide clean code and pixel perfect design. We also make the website more  more interactive with web animations.We can provide clean code and pixel perfect design. We also make the website more  more interactive with web animations. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita velit deleniti quia placeat eius ab voluptate aperiam minima fugiat quam maiores doloribus commodi, voluptatum exercitationem quibusdam eum aspernatur qui ut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae fugiat delectus, eos vel numquam quasi nulla magni placeat, eius, doloribus iusto atque blanditiis! Nam ratione aperiam mollitia dolor? Saepe, sed.
				Voluptatibus quos rerum quis, quaerat et, provident suscipit adipisci minus molestiae alias veniam! Sint amet maiores totam voluptatibus quam dolore nostrum. Voluptatum atque molestias blanditiis perferendis inventore necessitatibus eos placeat!
				Adipisci, nisi! Rerum atque error repellendus quasi deleniti ipsam debitis praesentium eius! Id minima natus quas voluptates a itaque suscipit enim quod ad, temporibus, dolorem quaerat repellendus laboriosam sed sunt!
				Doloremque quaerat reiciendis reprehenderit dolores delectus earum nihil saepe perspiciatis fuga? Sit mollitia commodi assumenda unde. Itaque placeat et facere omnis cum aliquid reiciendis, debitis aperiam quibusdam molestias, quasi quia!
				Ea maiores nulla quibusdam voluptatem numquam sit molestias quia repellat fugit, at totam? Ullam error distinctio quis, reiciendis animi earum quaerat ad porro pariatur illum iusto adipisci veritatis laudantium optio?
				Inventore omnis, iste fuga aliquid et vitae sit numquam saepe a sunt nulla ullam consectetur officiis, quo quasi eveniet mollitia illum nobis quidem ab doloribus non libero. Nihil, esse laboriosam?
				Laboriosam a quasi perspiciatis suscipit accusantium aliquid delectus odio, ad, sit aperiam assumenda dolore voluptatibus, necessitatibus facilis fugiat? Rerum perferendis explicabo dolor provident laudantium corrupti sapiente nobis aut deleniti? Voluptatem.
				</p>
				<button className="about-button" type="button"><a href="/contact">CONTACT US</a></button>
			</div>
      <img src={about} alt="" />
		</div>
	</section>
	</div>

	{/* <div className="service">
		<div className="title">
			<h2>OUR <span>SERVICES</span></h2>
		</div>


	</div> */}
    </>
  );
};

export default About;
