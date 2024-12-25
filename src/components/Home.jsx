import React, { useEffect, useRef, useState } from "react";
import "../styles/Home.css";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  DoughnutController,
  ArcElement,
} from "chart.js";

// Register Chart.js components
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  DoughnutController,
  ArcElement
);

const Home = () => {
  // Refs for each course
  const barChartRefs = [useRef(null), useRef(null), useRef(null)];
  const doughnutChartRefs = [useRef(null), useRef(null), useRef(null)];
  const barChartInstances = useRef([]);
  const doughnutChartInstances = useRef([]);

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const chartData = [
    {
      course: "Course 1",
      barData: [30, 25, 50, 40, 45, 60],
      doughnutData: [50, 20, 5],
    },
    {
      course: "Course 2",
      barData: [20, 30, 40, 35, 50, 45],
      doughnutData: [45, 25, 10],
    },
    {
      course: "Course 3",
      barData: [25, 35, 45, 55, 40, 50],
      doughnutData: [10, 15, 1],
    },
  ];

  useEffect(() => {
    // Clean up any existing charts
    barChartInstances.current.forEach((instance) => instance?.destroy());
    doughnutChartInstances.current.forEach((instance) => instance?.destroy());

    // Create new charts for each course
    chartData.forEach((data, index) => {
      const barCtx = barChartRefs[index].current.getContext("2d");
      const doughnutCtx = doughnutChartRefs[index].current.getContext("2d");

      barChartInstances.current[index] = new Chart(barCtx, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Attendance",
              data: data.barData,
              backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#4CAF50", "#FF5722", "#2196F3"],
              borderWidth: 1,
              borderRadius: 5,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                color: darkMode ? "#ffffff" : "#333333",
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      doughnutChartInstances.current[index] = new Chart(doughnutCtx, {
        type: "doughnut",
        data: {
          labels: ["Present", "Absent", "Late"],
          datasets: [
            {
              label: "Attendance Overview",
              data: data.doughnutData,
              backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "left",
              labels: {
                color: darkMode ? "#ffffff" : "#333333",
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          cutout: "70%",
        },
      });
    });

    // Clean up charts on unmount
    return () => {
      barChartInstances.current.forEach((instance) => instance?.destroy());
      doughnutChartInstances.current.forEach((instance) => instance?.destroy());
    };
  }, [darkMode, chartData]);

  return (
    <div className={`home-container ${darkMode ? "dark" : "light"}`}>
      <div className="profile-section">
        <h3>Welcome, Teachers!</h3>
        <button className="toggle-theme" onClick={toggleDarkMode}>
          Dark / Lite
        </button>
      </div>

      <div className="charts">
        
        {chartData.map((data, index) => (
          <div className="block" key={index}>
            <h3>{data.course} Attendance</h3>
            <div className="chart-container">
              <canvas ref={barChartRefs[index]}></canvas>
            </div>
            <div className="chart-container">
              <canvas ref={doughnutChartRefs[index]} className="canvas"></canvas>
            </div>
            <div className="stats">
              <p>Total Present: {data.doughnutData[0]}</p>
              <p>Total Absent: {data.doughnutData[1]}</p>
              <p>Total Late: {data.doughnutData[2]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
