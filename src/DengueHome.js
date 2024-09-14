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
      Welcome to the Dengue Data DashboardWelcome to the Dengue Data DashboardWelcome to the Dengue Data DashboardWelcome to the Dengue Data DashboardWelcome to the Dengue Data DashboardWelcome to the Dengue Data DashboardWelcome to the Dengue Data DashboardWelcome to the Dengue Data DashboardWelcome to the Dengue Data DashboardWelcome to the Dengue Data Dashboard
      </p>
    </div>
  );
};

export default DengueHome;
