import React, { useState, useEffect } from 'react';
import Button from './Button';

const FeaturedProduct = () => {
  const [style, setStyle] = useState('');
  const [thumbnailcheck, setThumbnailcheck] = useState('');
  const [thumbnailstyle, setThumbnailstyle] = useState('');
  const [product, setProduct] = useState({
    title: '',
    price: '',
    image: { src: '' },
    handle: '',
    variants: [],
    options: [],
    images: [],
  });
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [currentPrice, setCurrentPrice] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); // Index for active thumbnail

  useEffect(() => {
    if (window.FeaturedProductData) {
      const { style, product, thumbnailcheck, thumbnailstyle } = window.FeaturedProductData;
      setStyle(style || '');
      setProduct(product || {});
      setThumbnailcheck(thumbnailcheck || '');
      setThumbnailstyle(thumbnailstyle || '');

      if (product.variants && product.variants.length > 0) {
        const defaultVariant = product.variants[0];
        setSelectedVariantId(defaultVariant.id);
        setCurrentPrice(defaultVariant.price || product.price);
        setCurrentImage(defaultVariant.image?.src || product.image.src || '');
        // Set the initial index based on the default variant image
        const defaultImageIndex = product.images.findIndex(img => img.src === defaultVariant.image?.src);
        setCurrentIndex(defaultImageIndex >= 0 ? defaultImageIndex : 0);
      }

      if (product.images && product.images.length > 0) {
        setCurrentImage(product.images[0].src || ''); // Ensure a fallback for image src
        setCurrentIndex(0); // Set initial index to 0
      } else {
        setCurrentImage(product.image.src || ''); // Fallback to main product image if no variant images
      }
    }
  }, []);

  useEffect(() => {
    if (product.images.length > 0 && currentIndex >= 0 && currentIndex < product.images.length) {
      setCurrentImage(product.images[currentIndex].src);
    }
  }, [currentIndex, product.images]);

  const VariantClick = (event, variantId, variantPrice, variantImage) => {
    event.preventDefault();
    if (variantId) {
      setSelectedVariantId(variantId);
      setCurrentPrice(variantPrice);
      setCurrentImage(variantImage || ''); // Ensure a fallback for image src
      
      // Find the index of the variant image in the images array
      const newIndex = product.images.findIndex(img => img.src === variantImage);
      setCurrentIndex(newIndex >= 0 ? newIndex : 0); // Update currentIndex
    }
  };

  const handleDropdownChange = (event) => {
    const variantId = event.target.value;
    console.log('Selected variant ID:', variantId);

    const selectedVariant = product.variants.find(variant => variant.id === variantId);
    if (selectedVariant) {
      setSelectedVariantId(variantId);
      setCurrentPrice(selectedVariant.price);
      setCurrentImage(selectedVariant.image?.src || ''); // Ensure a fallback for image src

      // Find the index of the variant image in the images array
      const newIndex = product.images.findIndex(img => img.src === selectedVariant.image?.src);
      setCurrentIndex(newIndex >= 0 ? newIndex : 0); // Update currentIndex
    }
  };

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 1, product.images.length - 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="page-width">
      <div id="hola-featured-product-react">
        {thumbnailstyle === 'style-bottom' && (
          <div className="featured-product-imagesthumbnail style-bottom">
            <div id="hola-featured-image">
              <a href={`/products/${product.handle || ''}`}>
                <img
                  src={currentImage || 'https://via.placeholder.com/300'}
                  alt={product.title || 'No image available'}
                  className="featured-product-image"
                />
              </a>
            </div>
            {thumbnailcheck === 'true' && (
              <div id="featured-thumbnails">
                {product.images.length > 0 && (
                  <div className="thumbnail-container">
                    <button
                      className="thumbnail-nav-button prev"
                      onClick={handlePrevClick}
                      disabled={currentIndex === 0}
                    >
                      &lt;
                    </button>
                    {product.images.map((img, index) => (
                      <img
                        key={index}
                        src={img.src || 'https://via.placeholder.com/100'}
                        alt={`Thumbnail ${index}`}
                        className={`thumbnail-image ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => handleThumbnailClick(index)}
                      />
                    ))}
                    <button
                      className="thumbnail-nav-button next"
                      onClick={handleNextClick}
                      disabled={currentIndex === product.images.length - 1}
                    >
                      &gt;
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {thumbnailstyle === 'style-left' && (
          <div className="featured-product-imagesthumbnail style-left">
            {thumbnailcheck === 'true' && (
              <div id="featured-thumbnails">
                {product.images.length > 0 && (
                  <div className="thumbnail-container">
                    <button
                      className="thumbnail-nav-button prev"
                      onClick={handlePrevClick}
                      disabled={currentIndex === 0}
                    >
                      &lt;
                    </button>
                    {product.images.map((img, index) => (
                      <img
                        key={index}
                        src={img.src || 'https://via.placeholder.com/100'}
                        alt={`Thumbnail ${index}`}
                        className={`thumbnail-image ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => handleThumbnailClick(index)}
                      />
                    ))}
                    <button
                      className="thumbnail-nav-button next"
                      onClick={handleNextClick}
                      disabled={currentIndex === product.images.length - 1}
                    >
                      &gt;
                    </button>
                  </div>
                )}
              </div>
            )}
            <div id="hola-featured-image">
              <a href={`/products/${product.handle || ''}`}>
                <img
                  src={currentImage || 'https://via.placeholder.com/300'}
                  alt={product.title || 'No image available'}
                  className="featured-product-image"
                />
              </a>
            </div>
          </div>
        )}
        <div id="hole-featured-product-info">
          <a href={`/products/${product.handle || ''}`}>
            <h2 className="featured-product-title">{product.title || 'No title available'}</h2>
            <p className="featured-product-price">{currentPrice ? `${currentPrice}` : 'No price available'}</p>
          </a>

          {product.options.length > 0 && (
            <div className="product-options">
              {product.options.map((option, index) => (
                <p key={index} className="product-option-title">
                  {option}
                </p>
              ))}
            </div>
          )}

          {style === 'style-button' && (
            <div className='variants-button-selector'>
              {product.variants.length > 0 && (
                <div className="product-variants">
                  <ul>
                    {product.variants.map((variant) => (
                      <li key={variant.id} data-variant-id={variant.id}>
                        <button onClick={(event) => VariantClick(event, variant.id, variant.price, variant.image?.src)}>
                          {variant.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {style === 'style-dropdown' && (
            <div className='variants-dropdown-selector'>
              {product.variants.length > 0 && (
                <div className="product-variants">
                  <select onChange={handleDropdownChange} defaultValue="">
                    <option value="" disabled>Select a variant</option>
                    {product.variants.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          <Button featured={product.id} variantID={selectedVariantId} />
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
