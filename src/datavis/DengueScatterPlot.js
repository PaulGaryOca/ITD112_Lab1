import React, { useState, useEffect } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import '../DengueAnalytics.css';


ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const DengueScatterPlot = () => {
  const [dengueData, setDengueData] = useState([]);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [scatterData, setScatterData] = useState({ datasets: [] });
  const [regionOptions, setRegionOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dengueCollection = collection(db, 'dengueData');
      const dengueSnapshot = await getDocs(dengueCollection);
      const dataList = dengueSnapshot.docs.map(doc => doc.data());
      
     
      const uniqueRegions = [...new Set(dataList.map(item => item.regions))];
      setRegionOptions(uniqueRegions);
      setFilteredRegions([uniqueRegions[0]]); 

      setDengueData(dataList);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = dengueData.filter(data => filteredRegions.includes(data.regions));
    const scatterPlotData = {
      datasets: [
        {
          label: 'Dengue Cases vs Deaths',
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
    };

    setScatterData(scatterPlotData);
  }, [dengueData, filteredRegions]);

  const handleRegionChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setFilteredRegions(options);
  };

  return (
    <div>
      <h2>Dengue Data Scatter Plot</h2>
      <div>
        <label htmlFor="regionFilter">Select Regions:</label>
        <select
          id="regionFilter"
          multiple
          value={filteredRegions}
          onChange={handleRegionChange}
        >
          {regionOptions.map(region => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
      <div className="chart-container"> {}
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
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Dengue Cases',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Dengue Deaths',
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
