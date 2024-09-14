import React, { useState } from 'react';


const buttonStyles = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'background-color 0.3s, color 0.3s',
  margin: '0 100px',
};

const navStyles = {
  position: 'fixed',
  top: '0px',
  left: '0', 
  width: '100%', 
  display: 'flex',
  justifyContent: 'center', 
  paddingBottom:'50px',
  paddingTop:'100px',
  backgroundColor: '#f8f9fa', 
  zIndex: '100', 
 };
const Nav = ({ setActiveTab }) => {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <nav style={navStyles}>
      {['home', 'addData', 'viewDengue', 'viewAnalytics'].map((tab, index) => (
        <button
          key={index}
          style={{
            ...buttonStyles,
            backgroundColor: '#00215E',
            color: '#fff',
            ...(hoveredButton === tab ? { backgroundColor: '#004080', color: '#e0e0e0' } : {}),
          }}
          onMouseEnter={() => setHoveredButton(tab)}
          onMouseLeave={() => setHoveredButton(null)}
          onClick={() => setActiveTab(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
        </button>
      ))}
    </nav>
  );
};

export default Nav;
