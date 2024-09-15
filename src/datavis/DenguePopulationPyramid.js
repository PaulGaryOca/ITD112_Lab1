import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import '../DengueAnalytics.css'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DenguePopulationPyramid = () => {
  const [pyramidData, setPyramidData] = useState({ labels: [], datasets: [] });
  const [allData, setAllData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const dengueCollection = collection(db, 'dengueData');
      const dengueSnapshot = await getDocs(dengueCollection);
      const dataList = dengueSnapshot.docs.map(doc => doc.data());

    
      setAllData(dataList);

      const regionCounts = dataList.reduce((acc, data) => {
        if (!acc[data.regions]) {
          acc[data.regions] = { cases: 0, deaths: 0 };
        }
        acc[data.regions].cases += data.cases;
        acc[data.regions].deaths += data.deaths;
        return acc;
      }, {});

      const sortedRegions = Object.keys(regionCounts).sort();
      const sortedCasesData = sortedRegions.map(region => regionCounts[region].cases);
      const sortedDeathsData = sortedRegions.map(region => regionCounts[region].deaths);

      setRegions(sortedRegions);
      setPyramidData({
        labels: sortedRegions,
        datasets: [
          {
            label: 'Deaths',
            data: sortedDeathsData.map(d => -d),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            barThickness: 20,
          },
          {
            label: 'Cases',
            data: sortedCasesData,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            barThickness: 20,
          },
        ],
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      const filteredData = allData.filter(data => data.regions === selectedRegion);
      const regionCounts = filteredData.reduce((acc, data) => {
        if (!acc[data.regions]) {
          acc[data.regions] = { cases: 0, deaths: 0 };
        }
        acc[data.regions].cases += data.cases;
        acc[data.regions].deaths += data.deaths;
        return acc;
      }, {});

      const sortedRegions = Object.keys(regionCounts).sort();
      const sortedCasesData = sortedRegions.map(region => regionCounts[region].cases);
      const sortedDeathsData = sortedRegions.map(region => regionCounts[region].deaths);

      setPyramidData({
        labels: sortedRegions,
        datasets: [
          {
            label: 'Deaths',
            data: sortedDeathsData.map(d => -d),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            barThickness: 20,
          },
          {
            label: 'Cases',
            data: sortedCasesData,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            barThickness: 20,
          },
        ],
      });
    } else {
      const regionCounts = allData.reduce((acc, data) => {
        if (!acc[data.regions]) {
          acc[data.regions] = { cases: 0, deaths: 0 };
        }
        acc[data.regions].cases += data.cases;
        acc[data.regions].deaths += data.deaths;
        return acc;
      }, {});

      const sortedRegions = Object.keys(regionCounts).sort();
      const sortedCasesData = sortedRegions.map(region => regionCounts[region].cases);
      const sortedDeathsData = sortedRegions.map(region => regionCounts[region].deaths);

      setPyramidData({
        labels: sortedRegions,
        datasets: [
          {
            label: 'Deaths',
            data: sortedDeathsData.map(d => -d),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            barThickness: 20,
          },
          {
            label: 'Cases',
            data: sortedCasesData,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            barThickness: 20,
          },
        ],
      });
    }
  }, [selectedRegion, allData]);

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

      <h3>Dengue Population Pyramid (Deaths and Cases)</h3>
      <Bar
        data={pyramidData}
        options={{
          responsive: true,
          indexAxis: 'y',
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
                  if (context.parsed.x !== null) {
                    label += Math.abs(context.parsed.x);
                  }
                  return label;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Count',
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
                text: 'Region',
                font: {
                  size: 30,
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default DenguePopulationPyramid;
