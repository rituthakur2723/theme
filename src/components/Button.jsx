import React, { useState, useEffect } from 'react';

const Button = ({ featured, variantID }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (featured) {
      setData(featured);
    }
  }, [featured]);

  const handleClick = (event) => {
    event.preventDefault();
    const idToUse = variantID || data?.variants?.[0]?.id; // Fallback to the first variant ID if none provided

    if (idToUse) {
      // Add the product to the cart using Shopify's AJAX API
      fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              id: idToUse, // Use the ID to add to the cart
              quantity: 1, // Adjust the quantity as needed
            },
          ],
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Product added to cart:', data);
          setTimeout(() => {
            updateCartDrawer();
            openCartDrawer();
          }, 1000);
        })
        .catch((error) => {
          console.error('Error adding product to cart:', error);
        });
    } else {
      console.log('No variant ID provided');
    }
  };

  const updateCartDrawer = () => {
    fetch('/cart.js')
      .then((response) => response.json())
      .then((cart) => {
        const cartDrawer = document.querySelector('#cart-drawer');
        if (cartDrawer) {
          cartDrawer.innerHTML = '<button class="cart-drawer-close" id="close-cart-drawer">X</button>';
          cart.items.forEach((item) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-drawer-item';
            cartItem.textContent = `${item.title} (${item.quantity})`;
            cartDrawer.appendChild(cartItem);
          });

          const closeBtn = document.getElementById('close-cart-drawer');
          if (closeBtn) {
            closeBtn.addEventListener('click', closeCartDrawer);
          }
        }
      })
      .catch((error) => {
        console.error('Error updating cart drawer:', error);
      });
  };

  const openCartDrawer = () => {
    const cartDrawer = document.getElementById('cart-drawer');
    if (cartDrawer) {
      cartDrawer.classList.add('open');
    }
  };

  const closeCartDrawer = () => {
    const cartDrawer = document.getElementById('cart-drawer');
    if (cartDrawer) {
      cartDrawer.classList.remove('open');
    }
  };

  return (
    <div className="ja">
      <button id="test-button" onClick={handleClick}>
        ADD TO CART
      </button>
    </div>
  );
};

export default Button;
