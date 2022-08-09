import React, { useState } from "react";
import slides from "../components/SliderData";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./carousel.css";

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const goToSlide = (slideIndex) => {
    setCurrent(slideIndex);
  };

  const dotsContainerStyles = {
    display: "flex",
    justifyContent: "center",
  };

  const dotStyle = {
    margin: "0 3px",
    cursor: "pointer",
    fontSize: "20px",
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <>
      <section className="slider">
        <div className="icon-back-left">
          <FaArrowLeft className="left-arrow" onClick={prevSlide} />
        </div>
        <div className="icon-back-right">
          <FaArrowRight className="right-arrow" onClick={nextSlide} />
        </div>
        {slides.map((slide, index) => {
          let position = "nextSlide";
          if (index === current) {
            position = "activeSlide";
          }
          if (
            index === current - 1 ||
            (current === 0 && index === slides.length - 1)
          ) {
            position = "lastSlide";
          }

          return (
            <div className={`slide ${position}`} key={index}>
              {index === current && (
                <img src={slide.image} alt="travel" className="image" />
              )}
            </div>
          );
        })}
        <div className="for-more"><p>Click for More</p></div>
        <div style={dotsContainerStyles} className="dot-container">
          {slides.map((slide, slideIndex) => (
            <div
              className={`${
                slideIndex === current ? "dot-active" : "dot-passive"
              }`}
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
            ></div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Carousel;
