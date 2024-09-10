import React from 'react';

const ImageTextSection = ({ settings }) => {
  const { image, text } = settings;

  return (
    <section className="image-text-section">
      <div className="image-container">
        <img src={image} alt="Custom" />
      </div>
      <div className="text-container">
        <p>{text}</p>
      </div>
    </section>
  );
};

export default ImageTextSection;
