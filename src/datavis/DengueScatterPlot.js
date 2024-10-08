import React, { useState, useEffect } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const DengueScatterPlot = () => {
  const [dengueData, setDengueData] = useState([]);
  const [scatterData, setScatterData] = useState({ datasets: [] });
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const dengueCollection = collection(db, 'dengueData');
      const dengueSnapshot = await getDocs(dengueCollection);
      const dataList = dengueSnapshot.docs.map(doc => doc.data());

      const uniqueRegions = [...new Set(dataList.map(item => item.regions))];
      setRegions(uniqueRegions);

      setScatterData({
        datasets: [
          {
            label: 'Dengue Cases vs Deaths',
            data: dataList.map(item => ({
              x: item.cases,
              y: item.deaths,
              region: item.regions,
            })),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            pointRadius: 5,
            pointHoverRadius: 7,
          }
        ],
      });

      setDengueData(dataList);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      const filteredData = dengueData.filter(data => data.regions === selectedRegion);

      setScatterData({
        datasets: [
          {
            label: `Dengue Cases vs Deaths (${selectedRegion})`,
            data: filteredData.map(item => ({
              x: item.cases,
              y: item.deaths,
              region: item.regions,
            })),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            pointRadius: 5,
            pointHoverRadius: 7,
          }
        ],
      });
    } else {
      setScatterData({
        datasets: [
          {
            label: 'Dengue Cases vs Deaths',
            data: dengueData.map(item => ({
              x: item.cases,
              y: item.deaths,
              region: item.regions,
            })),
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            pointRadius: 5,
            pointHoverRadius: 7,
          }
        ],
      });
    }
  }, [selectedRegion, dengueData]);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const chartContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '100px auto',
    width: '100%',
    maxWidth: '1800px',
    position: 'relative',
  };

  const dropdownStyles = {
    position: 'absolute',
    top: '25px', 
    right: '30px',
    zIndex: 1,
    fontSize: '25px',
  };

  const dropdownSelectStyles = {
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    outline: 'none',
    width: '200px',
  };

  return (
    <div style={chartContainerStyles}>
      <div style={dropdownStyles}>
        <select
          value={selectedRegion}
          onChange={handleRegionChange}
          style={dropdownSelectStyles}
        >
          <option value="">Select a region</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
      
      <h3>Dengue Scatter Plot (Cases vs Deaths)</h3>
      <div style={{ width: '1100px', height: '1000px' }}>
      <Scatter
  data={scatterData}
  options={{
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Cases: ${context.raw.x}, Deaths: ${context.raw.y}`;
          },
        },
        font: {
            size: 30,
          },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Dengue Cases',
          font: {
            size: 30,
          },
        },
        ticks: {
          font: {
            size: 20,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Dengue Deaths',
          font: {
          size: 30,
        },
        },
        
        ticks: {
          font: {
            size: 20,
          },
        },
      },
    },
  }}
/>

      </div>
    </div>
  );
};

export default DengueScatterPlot;
