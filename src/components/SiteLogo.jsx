import React from 'react';

const SiteLogo = ({ settings }) => {
  const { image } = settings;

  return (
    <div className="store-logo">
      
        <img src={image} alt="Custom" />
      
    </div>
  );
};

export default SiteLogo;
