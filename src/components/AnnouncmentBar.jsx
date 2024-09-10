import React from 'react';

const AnnouncmentBar = ({ settings }) => {
  const { text, style } = settings;

  return (
    <div className="announcmentBar">
      {style === 'style-one' && (
        <div className="announcment-bar-inner style-one">
          <p>{text}</p>
        </div>
      )}

      {style === 'style-two' && (
        <div className="announcment-bar-inner style-two">
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default AnnouncmentBar;
