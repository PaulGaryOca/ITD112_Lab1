import React from 'react';

const containerStyles = {
  padding: '20px',
  backgroundColor: '#e9ecef', 
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
maxWidth:'1200px',
  margin: '20px auto', 
  position:'absolute',
  marginTop:'200px',
  marginLeft:'325px',
};

const headingStyles = {
  color: '#00215E', 
  fontSize: '24px',
  fontWeight: 'bold',
};

const paragraphStyles = {
  color: '#333', 
  fontSize: '16px',
  lineHeight: '1.6',
};

const DengueHome = () => {
  return (
    <div style={containerStyles}>
      <h2 style={headingStyles}>Welcome to the Dengue Data Dashboard</h2>
      <p style={paragraphStyles}>
      Welcome to the Dengue Monitoring Application. We offer a range of features designed to help your community effectively monitor and manage dengue outbreaks. Dengue (break-bone fever) is a viral infection that spreads from mosquitoes to people. It is more common in tropical and subtropical climates.

Most people who get dengue will not have symptoms. But for those who do, the most common symptoms are high fever, headache, body aches, nausea, and rash. Most will get better in 1–2 weeks. Some people develop severe dengue and need care in a hospital. 

In severe cases, dengue can be fatal.  

You can lower your risk of dengue by avoiding mosquito bites especially during the day.

Dengue is treated with pain medicine as there is no specific treatment currently( WOH,2024). </p>
    </div>
  );
};

export default DengueHome;
