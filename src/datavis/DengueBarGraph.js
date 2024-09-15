import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DengueBarGraph = () => {
  const [regionData, setRegionData] = useState({ labels: [], datasets: [] });
  const [filteredData, setFilteredData] = useState({ labels: [], datasets: [] });
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const dengueCollection = collection(db, 'dengueData');
      const dengueSnapshot = await getDocs(dengueCollection);
      const dataList = dengueSnapshot.docs.map(doc => doc.data());

      const regionCounts = dataList.reduce((acc, data) => {
        if (!acc[data.regions]) {
          acc[data.regions] = { cases: 0, deaths: 0 };
        }
        acc[data.regions].cases += data.cases;
        acc[data.regions].deaths += data.deaths;
        return acc;
      }, {});

      const sortedRegions = Object.keys(regionCounts).sort();
      setRegions(sortedRegions);

      const sortedCasesData = sortedRegions.map(region => regionCounts[region].cases);
      const sortedDeathsData = sortedRegions.map(region => regionCounts[region].deaths);

      setRegionData({
        labels: sortedRegions,
        datasets: [
          {
            label: 'Cases',
            data: sortedCasesData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Deaths',
            data: sortedDeathsData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      });

   
      setFilteredData({
        labels: sortedRegions,
        datasets: [
          {
            label: 'Cases',
            data: sortedCasesData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Deaths',
            data: sortedDeathsData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      const index = regions.indexOf(selectedRegion);
      const cases = regionData.datasets[0].data[index];
      const deaths = regionData.datasets[1].data[index];

      setFilteredData({
        labels: ['Cases', 'Deaths'],
        datasets: [
          {
            label: selectedRegion,
            data: [cases, deaths],
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      });
    } else {
      setFilteredData({
        labels: regionData.labels,
        datasets: regionData.datasets,
      });
    }
  }, [selectedRegion, regionData, regions]);

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
      
      <h3>Dengue Bar Graph (Deaths and Cases)</h3>
      <div style={{ width: '1100px', height: '1000px' }}>
        
        <Bar
          data={filteredData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    let label = context.dataset.label || '';
                    if (label) {
                      label += ': ';
                    }
                    if (context.parsed.y !== null) {
                      label += context.parsed.y;
                    }
                    return label;
                  },
                },
              },
            },
            scales: {
              x: {
                
                stacked: true,
                title: {
                  display: true,
                  text: 'Regions',
                  font: {
                    size: 30,
                  },
                ticks: {
                  font: {
                    size: 30,
                  },},
                },
              },
              y: 
              {
                stacked: true,
                title: {
                  display: true,
                  text: 'Count',
                  font: {
                    size: 30,
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

export default DengueBarGraph;