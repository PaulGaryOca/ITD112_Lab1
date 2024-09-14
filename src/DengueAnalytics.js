import React, { useState } from 'react'; 
import DengueBarGraph from './datavis/DengueBarGraph';
import DenguePopulationPyramid from './datavis/DenguePopulationPyramid';
import DengueScatterPlot from './datavis/DengueScatterPlot';

const containerStyles = {
  padding: '20px',
  maxWidth: '1200px',
  margin: '0 auto', // Center horizontally
  paddingTop: '80px', // Add padding top to avoid overlap with fixed buttons
};

const buttonGroupStyles = {
  position: 'fixed',
  top: '200px', // Distance from the top of the viewport
  left: '50%',
  transform: 'translateX(-50%)', // Center horizontally
  display: 'flex',
  gap: '10px',
  padding: '10px 20px', // Padding inside the button group
  backgroundColor: '#f8f9fa', // Light background color


  zIndex: '1000', // Ensure buttons are above other content
};

const buttonStyles = {
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  backgroundColor: '#00215E', 
  color: '#fff', transition: 'background-color 0.3s, color 0.3s',
};

const buttonHoverStyles = {
  backgroundColor: '#004080', 
  color: '#e0e0e0', 
};

const chartContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '800px', 
    padding: '20px',
};

const DengueAnalytics = () => {
  const [chartType, setChartType] = useState('bar'); 

  return (
    <div style={containerStyles}>
      <h2>Dengue Data Analytics</h2>
      <div style={buttonGroupStyles}>
        <button
          style={buttonStyles}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyles.backgroundColor}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor}
          onClick={() => setChartType('bar')}
        >
          Show Bar Graph
        </button>
        <button
          style={buttonStyles}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyles.backgroundColor}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor}
          onClick={() => setChartType('pyramid')}
        >
          Show Population Pyramid
        </button>
        <button
          style={buttonStyles}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyles.backgroundColor}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor}
          onClick={() => setChartType('scatter')}
        >
          Show Scatter Plot
        </button>
      </div>
      <div style={chartContainerStyles}>
        {chartType === 'bar' && <DengueBarGraph />}
        {chartType === 'pyramid' && <DenguePopulationPyramid />}
        {chartType === 'scatter' && <DengueScatterPlot />}
      </div>
    </div>
  );
};

export default DengueAnalytics;
