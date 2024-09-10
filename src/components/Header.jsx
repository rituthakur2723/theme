import React, { useEffect } from 'react';
import SiteLogo from './SiteLogo';
const Header = ({ settings }) => {
  
  const { style, image, menu, submenucondition } = settings || {}; // Destructure settings with fallback
  
  const updateCartDrawer = () => {
    // Fetch the updated cart data
    fetch('/cart.js')
      .then((response) => response.json())
      .then((cart) => {
        // Get the cart drawer element
        const cartDrawer = document.querySelector('#cart-drawer');
        if (cartDrawer) {
          // Clear the existing cart items
          cartDrawer.innerHTML = '<button class="cart-drawer-close" id="close-cart-drawer">X</button>';

          // Loop through the cart items and update the drawer
          cart.items.forEach((item) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-drawer-item';
            cartItem.textContent = `${item.title} (${item.quantity})`;
            cartDrawer.appendChild(cartItem);
          });

          // Attach the event listener for closing the cart drawer
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
      updateCartDrawer();
      cartDrawer.classList.add('open');
    }
  };
  useEffect(() => {
    // Attach event listener to cart icon
    const cartIcon = document.querySelector('.hola-toggle-cart');
    if (cartIcon) {
      cartIcon.addEventListener('click', openCartDrawer);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (cartIcon) {
        cartIcon.removeEventListener('click', openCartDrawer);
      }
    };
  }, []);
  const closeCartDrawer = () => {
    const cartDrawer = document.getElementById('cart-drawer');
    if (cartDrawer) {
      cartDrawer.classList.remove('open');
    }
  };
  return (
    <header className="header-main">
      
      {submenucondition === 'true' && style === 'style-one' && (
        <div className="header-option hola-style-one has-submenu-option">
          <div className='header-menu'>
          <div className="hola-store-logo logo-left">
            <img
              src={image} 
              alt="Site Logo"
              className="site-logo" 
            />
          </div>
          <nav className="hola-store-nav nav-center">
                      

          <ul className="flex space-x-4">
              {menu && menu.map((item, index) => (
                <li
                  key={index}
                  className={`header-mainMenus ${item && item.length > 0 ? 'has-submenu' : ''}`}
                >
                  <a href={item.url} className="hover:underline">{item.title}</a>
                  
                </li>
              ))}
            </ul>
          </nav>
          <div className="holo-cart-icon">
            <span className="hola-toggle-cart" title="Shopping Cart"><svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="shopping-bag" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-cart"><path fill="currentColor" d="M352 128C352 57.421 294.579 0 224 0 153.42 0 96 57.421 96 128H0v304c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V128h-96zM224 32c52.935 0 96 43.065 96 96H128c0-52.935 43.065-96 96-96zm192 400c0 26.467-21.533 48-48 48H80c-26.467 0-48-21.533-48-48V160h64v48c0 8.837 7.164 16 16 16s16-7.163 16-16v-48h192v48c0 8.837 7.163 16 16 16s16-7.163 16-16v-48h64v272z" class=""></path></svg><span class="icon__fallback-text">Cart</span>
            <span className="hola-cart-count site-header__cart-indicator">0</span>
            </span>
         </div>
          </div>
          
          <div className='submenu-dropdown'>
          {menu && menu.map((item, index) => (
          <>
                  {item.submenu && item.submenu.length > 0 && (
                    <ul className="submenu">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex} className="submenu-item">
                          <a href={subItem.url} className="submenu-link">{subItem.title}</a>

                          {/* Check for sub-submenu */}
                          {subItem.submenu && subItem.submenu.length > 0 && (
                            <ul className="sub-submenu">
                              {subItem.submenu.map((subsubItem, subsubIndex) => (
                                <li key={subsubIndex} className="sub-submenu-item">
                                  <a href={subsubItem.url} className="sub-submenu-link">{subsubItem.title}</a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
                ))}
          </div>
          
        </div>
      )}
{submenucondition === 'true' || style === 'style-one' && (
        <div className="header-option hola-style-one">
          <div className="hola-store-logo logo-left">
            <img
              src={image} 
              alt="Site Logo"
              className="site-logo" 
            />
          </div>
          <nav className="hola-store-nav nav-center">
                      

          <ul className="flex space-x-4">
              {menu && menu.map((item, index) => (
                <li
                  key={index}
                  className="header-mainMenu"
                >
                  <a href={item.url} className="hover:underline">{item.title}</a>
                 
                </li>
              ))}
            </ul>
          </nav>
          <div className="holo-cart-icon">
            <span className="hola-toggle-cart" title="Shopping Cart"><svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="shopping-bag" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-cart"><path fill="currentColor" d="M352 128C352 57.421 294.579 0 224 0 153.42 0 96 57.421 96 128H0v304c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V128h-96zM224 32c52.935 0 96 43.065 96 96H128c0-52.935 43.065-96 96-96zm192 400c0 26.467-21.533 48-48 48H80c-26.467 0-48-21.533-48-48V160h64v48c0 8.837 7.164 16 16 16s16-7.163 16-16v-48h192v48c0 8.837 7.163 16 16 16s16-7.163 16-16v-48h64v272z" class=""></path></svg><span class="icon__fallback-text">Cart</span>
            <span className="hola-cart-count site-header__cart-indicator">0</span>
            </span>
         </div>
        </div>
      )}
      
      {style === 'style-two' && (
        <div className="header-option hola-style-two">
        
        <nav className="hola-store-nav nav-left">
          <ul className="flex space-x-4">
          {menu && menu.map((item, index) => (
              <li key={index}>
                <a href={item.url} className="hover:underline">{item.title}</a>
              </li>
              
            ))}
          </ul>
        </nav>
        <div className="hola-store-logo logo-center">
          <img
            src={image} 
            alt="Site Logo"
            className="site-logo" 
          />
        </div>
        <div className="hole-cart-icon">
          <span className="hola-toggle-cart" title="Shopping Cart"><svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="shopping-bag" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-cart"><path fill="currentColor" d="M352 128C352 57.421 294.579 0 224 0 153.42 0 96 57.421 96 128H0v304c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V128h-96zM224 32c52.935 0 96 43.065 96 96H128c0-52.935 43.065-96 96-96zm192 400c0 26.467-21.533 48-48 48H80c-26.467 0-48-21.533-48-48V160h64v48c0 8.837 7.164 16 16 16s16-7.163 16-16v-48h192v48c0 8.837 7.163 16 16 16s16-7.163 16-16v-48h64v272z" class=""></path></svg><span class="icon__fallback-text">Cart</span>
          <span className="hola-cart-count site-header__cart-indicator">0</span>
          </span>
       </div>
      </div>
      )}
      {style === 'style-three' && (
        <div className="header-option hola-style-three">
        
        <div className="hole-logo-center">

        <div className="hola-store-logo logo-center">
          <img
            src={image} 
            alt="Site Logo"
            className="site-logo" 
          />
        </div>
        <div className="hole-cart-icon">
          <span class="js-toggle-cart" title="Shopping Cart"><svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="shopping-bag" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-cart"><path fill="currentColor" d="M352 128C352 57.421 294.579 0 224 0 153.42 0 96 57.421 96 128H0v304c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V128h-96zM224 32c52.935 0 96 43.065 96 96H128c0-52.935 43.065-96 96-96zm192 400c0 26.467-21.533 48-48 48H80c-26.467 0-48-21.533-48-48V160h64v48c0 8.837 7.164 16 16 16s16-7.163 16-16v-48h192v48c0 8.837 7.163 16 16 16s16-7.163 16-16v-48h64v272z" class=""></path></svg><span class="icon__fallback-text">Cart</span>
          <span class="js-cart-count site-header__cart-indicator">0</span>
          </span>
       </div>
        </div>
        <div className="hola-nav-bottom">
        <nav className="hola-store-nav nav-bottom">
          <ul className="flex space-x-4">
          
            {menu && menu.map((item, index) => (
              <li key={index}>
                <a href={item.url} className="hover:underline">{item.title}</a>
              </li>
              
              
            ))}
            {console.log(item.url)}
          </ul>
        </nav>
        </div>
        
      </div>
      )}
    </header>
  );
};

export default Header;
