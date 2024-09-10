import React from 'react';

// Recursive Menu component
const Menu = ({ items }) => {
  return (
    <ul className="menu">
      {items.map((item, index) => (
        <li key={index} className={`menu-item ${item.submenu ? 'has-submenu' : ''}`}>
          <a href={item.url} className="menu-link">{item.title}</a>
          {item.submenu && item.submenu.length > 0 && (
            <ul className="submenu">
              {item.submenu.map((subItem, subIndex) => (
                <li key={subIndex} className="submenu-item">
                  <a href={subItem.url} className="submenu-link">{subItem.title}</a>
                  {subItem.submenu && subItem.submenu.length > 0 && (
                    <ul className="sub-submenu">
                      {subItem.submenu.map((subSubItem, subSubIndex) => (
                        <li key={subSubIndex} className="sub-submenu-item">
                          <a href={subSubItem.url} className="sub-submenu-link">{subSubItem.title}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};
