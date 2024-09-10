import React, { useEffect, useState } from 'react';

const FeaturedCollection = () => {
  const [collection, setCollection] = useState({
    title: '',
    products: [],
  });

  useEffect(() => {
    // Ensure that data is loaded from window.FeaturedCollectionSettings
    if (window.FeaturedCollectionSettings) {
      const { title, products } = window.FeaturedCollectionSettings; // Destructure collection settings
      setCollection({
        title: title || 'Default Collection Title',
        products: products || [],
      });
    }
  }, []);

  return (
    <div className="featured-collection">
      <h2>{collection.title}</h2>
      <div className="product-list">
        {collection.products.length > 0 ? (
          collection.products.map((product, index) => (
            <div key={index} className="product-item">
              <a href={`/products/${product.handle}`}>
                <img src={product.image || 'https://via.placeholder.com/150'} alt={product.title} />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
              </a>
            </div>
          ))
        ) : (
          <p>No products available in this collection.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedCollection;
