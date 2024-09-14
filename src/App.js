import React, { useState } from "react";
import Nav from "./Nav";
import AddData from "./AddDengueData";
import DengueDataList from "./DengueDataList";
import DengueAnalytics from "./DengueAnalytics";
import DengueHome from "./DengueHome";
//nav ,set to home
const App = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div>
      <Nav setActiveTab={setActiveTab} />

      {activeTab === "home" && <DengueHome />}
      {activeTab === "addData" && <AddData />}
      {activeTab === "viewDengue" && <DengueDataList />}
      {activeTab === "viewAnalytics" && <DengueAnalytics />}
    </div>
  );
};

export default App;
