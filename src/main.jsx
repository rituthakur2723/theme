import './main.css';
import React from 'react';
import ReactDOM from 'react-dom/client'; // Use createRoot from 'react-dom/client'
import Header from './components/Header';
import ImageTextSection from './components/ImageTextSection';
import SiteLogo from './components/SiteLogo'; // Import SiteLogo if needed
import AnnouncmentBar from './components/AnnouncmentBar';
import SlideshowSection from './components/SlideshowSection'; 
import FeaturedProduct from './components/FeaturedProduct';
import Button from './components/Button';
import App from './components/App';
import FeaturedCollection from './components/FeaturedCollection';

document.addEventListener('DOMContentLoaded', () => {
  // AnnouncmentBar Component
  const AnnouncmentBarDiv = document.getElementById('announcmentBar');
  if (AnnouncmentBarDiv) {
    ReactDOM.createRoot(AnnouncmentBarDiv).render(
      <AnnouncmentBar settings={window.AnnouncmentBarSettings || {}} />
    );
  }

  const FeaturedCollectionDiv = document.getElementById('FeaturedCollection');
  if (FeaturedCollectionDiv) {
    ReactDOM.createRoot(FeaturedCollectionDiv).render(
      <FeaturedCollection settings={window.FeaturedCollectionSettings || {}} />
    );
  }

  // ImageTextSection Component
  const imageTextSectionDiv = document.getElementById('image-text-section');
  if (imageTextSectionDiv) {
    ReactDOM.createRoot(imageTextSectionDiv).render(
      <ImageTextSection settings={window.imageTextSectionSettings || {}} />
    );
  }

  // Header Component
  const headerDiv = document.getElementById('header-react');
  if (headerDiv) {
    const settings = window.headerSettings || {}; // Default to an empty object if not defined
    ReactDOM.createRoot(headerDiv).render(
      <Header settings={settings} />
    );
  }

  // SlideshowSection Component
  const slideshowSectionDiv = document.getElementById('slideshow-section');
  if (slideshowSectionDiv) {
    const slides = window.slideshowSettings?.slides || [];
    ReactDOM.createRoot(slideshowSectionDiv).render(
      <SlideshowSection slides={slides} />
    );
  }

  // FeaturedProduct Component
  const productData = window?.FeaturedProductData?.product || {};
  
  const rootElement = document.getElementById('btniD');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    const appProps = {
      product: productData,
      // Add any other props needed by App here
    };
    root.render(<App {...appProps} />);
  }
});
