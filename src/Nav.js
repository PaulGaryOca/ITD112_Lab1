import React, { useState } from 'react';

const buttonStyles = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'background-color 0.3s, color 0.3s',
  margin: '0 10px', 
  //width:'300px',
};

const navStyles = {
  position: 'fixed',
  marginTop: '-20px',
  
  marginLeft:'-20px',
  width: '100%', 
  
  alignItems: 'center', 
  paddingBottom: '50px',
  paddingTop: '10px', 
  backgroundColor: '#ffff', 
  zIndex: '100',
};

const logoStyles = {
  width: '100px', 
  height: 'auto',
  marginLeft:'350px',
  marginRight:'200px',  
  marginBottom:'-40px',
 marginTop:'-200px',
};

const Nav = ({ setActiveTab }) => {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    
    <nav style={navStyles}>
        <h1 style={{marginLeft:'450px', marginBottom: '-30px', marginTop:'50px',marginRight:'20px', color: '#black' , zIndex: '1',}}>
       HEALTHCARE 
        </h1> 
      <img
        src="https://png.pngtree.com/template/20190422/ourmid/pngtree-cross-plus-medical-logo-icon-design-template-image_145195.jpg" 
        alt="Logo"
        style={logoStyles}
      />
    {}
      {['home', 'addRecord', 'viewRecords', 'viewAnalytics'].map((tab, index) => (
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
