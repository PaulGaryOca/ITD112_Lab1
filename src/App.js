import React, { useState } from "react";
import Nav from "./Nav";
import AddData from "./AddDengueData";
import DengueDataList from "./DengueDataList";
import DengueAnalytics from "./DengueAnalytics";
import DengueHome from "./DengueHome";

const appStyles = {
  backgroundColor: '#f8f9fa', 
  minHeight: '100vh', 
  padding: '20px', 
  fontFamily: 'Arial, sans-serif',   
};

const App = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div style={appStyles}>
      <Nav setActiveTab={setActiveTab} />

      {activeTab === "home" && <DengueHome />}
      {activeTab === "addData" && <AddData />}
      {activeTab === "viewDengue" && <DengueDataList />}
      {activeTab === "viewAnalytics" && <DengueAnalytics />}
    </div>
  );
};

export default App;
