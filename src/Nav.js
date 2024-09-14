import React from 'react';

const Nav = ({ setActiveTab }) => {
  return (
    <nav>
      <button onClick={() => setActiveTab("home")}>Home</button>
      <button onClick={() => setActiveTab("addData")}>Add Data</button>
      <button onClick={() => setActiveTab("viewDengue")}>View Dengue Data</button>
      <button onClick={() => setActiveTab("viewAnalytics")}>View Analytics</button>
    </nav>
  );
};

export default Nav;
