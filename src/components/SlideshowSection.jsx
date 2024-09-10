import React, { useEffect, useRef, useState } from 'react';

const Slideshow = ({ slides }) => {
  const slideshowRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const slideshow = slideshowRef.current;
    if (!slideshow) return;

    const slideElements = slideshow.querySelectorAll('.slide');
    
    const showSlide = (i) => {
      slideElements.forEach((slide, idx) => {
        slide.style.display = idx === i ? 'block' : 'none';
      });
    };

    // Initial display of the first slide
    showSlide(index);
  }, [index, slides]);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % Object.keys(slides).length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? Object.keys(slides).length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slideshow" ref={slideshowRef}>
      {Object.keys(slides).map((key, i) => {
        const slide = slides[key];
        return (
          <div key={i} className="slide" style={{ display: i === index ? 'block' : 'none' }}>
            <img src={slide.image} alt="Custom" />
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        );
      })}
      <div className="swiper--button-wrapper right-position">
        <swiper-nav
          className="swiper-button-prev swiper-button"
          onClick={prevSlide}
          role="button"
          aria-label="Previous slide"
        >
          <svg width="37" height="14" viewBox="0 0 37 14" fill="none">
            <path
              d="M16.4075 6.70996L5.02014 6.70996C2.72077 6.70996 0.859376 4.84857 0.859376 2.5492L0.859375 0.789845"
              className="st0 draw-arrow"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M10.8398 1.12561L16.4084 6.70978L10.8398 12.2783"
              className="st0 tail"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </swiper-nav>
        <swiper-nav
          className="swiper-button-next swiper-button"
          onClick={nextSlide}
          role="button"
          aria-label="Next slide"
        >
          <svg width="37" height="14" viewBox="0 0 37 14" fill="none">
            <path
              d="M16.4075 6.70996L5.02014 6.70996C2.72077 6.70996 0.859376 4.84857 0.859376 2.5492L0.859375 0.789845"
              className="st0 draw-arrow"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M10.8398 1.12561L16.4084 6.70978L10.8398 12.2783"
              className="st0 tail"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </swiper-nav>
      </div>
    </div>
  );
};

export default Slideshow;
