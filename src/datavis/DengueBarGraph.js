import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import '../DengueAnalytics.css'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DengueBarGraph = () => {
  const [regionData, setRegionData] = useState({ labels: [], datasets: [] });

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
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container">
      <h3>Cases and Deaths by Region</h3>
      <Bar
        data={regionData}
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
            },
            y: {
              stacked: true,
            },
          },
        }}
      />
    </div>
  );
};

export default DengueBarGraph;
