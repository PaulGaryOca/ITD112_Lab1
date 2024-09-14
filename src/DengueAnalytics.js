import React, { useState } from 'react';
import DengueBarGraph from './datavis/DengueBarGraph';
import DenguePopulationPyramid from './datavis/DenguePopulationPyramid';
import DengueScatterPlot from './datavis/DengueScatterPlot';
import './DengueAnalytics.css'; 

const DengueAnalytics = () => {
  const [chartType, setChartType] = useState('bar'); 

  return (
    <div>
      <h2>Dengue Data Analytics</h2>
      <div className="button-group">
      <button onClick={() => setChartType('bar')}>Show Bar Graph</button>
        <button onClick={() => setChartType('pyramid')}>Show Population Pyramid</button>
        <button onClick={() => setChartType('scatter')}>Show Scatter Plot</button>
      </div>
      <div className="chart-container"> {}
        {chartType === 'bar' && <DengueBarGraph />}
        {chartType === 'pyramid' && <DenguePopulationPyramid />}
        {chartType === 'scatter' && <DengueScatterPlot />}
      </div>
    </div>
  );
};

export default DengueAnalytics;
