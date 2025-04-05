import { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AssistantIcon from "@mui/icons-material/Assistant";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Bar } from "react-chartjs-2"; // Import Bar chart component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components for Bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TrialDashboard = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [selectedContent, setSelectedContent] = useState("Overview");
  const [activeTab, setActiveTab] = useState("User Stats");

  const tabs = ["User Stats", "App Performance", "Insights", "User Feedback"];

  const handleItemClick = (content) => {
    setSelectedContent(content);
  };

  // Chart data for App Performance
  const chartData = {
    labels: ["M 1", "M 2", "M 3", "m 4", "M 5", "M 6"],
    datasets: [
      {
        label: "Server Response Time",
        data: [400, 300, 200, 250, 200, 230],
        backgroundColor: "rgba(140, 110, 200, 0.7)", // Light purple with gray undertones
        borderColor: "rgb(140, 110, 200)",
        borderWidth: 2,
      },
      {
        label: "Client-side Performance",
        data: [200, 250, 1000, 500, 400, 350],
        backgroundColor: "rgba(120, 90, 180, 0.7)", // Deeper lavender with purple undertones
        borderColor: "rgb(120, 90, 180)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <div className="flex h-screen bg-gray-50 text-gray-900">
        {/* Sidebar */}
        <div
          className={`h-full bg-white shadow-md ${
            openSidebar ? "w-64" : "w-20"
          } transition-all duration-300`}
          style={{ backgroundImage: "url('/chat-bg2.jpg')" }}
        >
          <div className="p-6 flex flex-col justify-between h-full bg-gray-100">
            <div className="border-b border-gray-200 p-5">
              <div className="chatList select-none flex flex-col h-full">
                <span className="text-xs font-semibold mb-2 text-gray-500">
                  DASHBOARD
                </span>
                <ul>
                  <li
                    className={`pl-6 text-gray-700 flex gap-2 py-2 px-4 rounded-lg hover:bg-gray-200 cursor-pointer ${
                      selectedContent === "Overview" ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleItemClick("Overview")}
                  >
                    <BarChartIcon className="scale-75" />
                    Overview
                  </li>
                  <li
                    className={`pl-6 text-gray-700 flex gap-2 py-2 px-4 rounded-lg hover:bg-gray-200 cursor-pointer ${
                      selectedContent === "Chatbot" ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleItemClick("Chatbot")}
                  >
                    <AssistantIcon className="scale-75" />
                    Chatbot
                  </li>
                </ul>
                <hr className="my-4 border-gray-200" />
                <span className="text-xs font-semibold mb-2 text-gray-500">
                  RECENT CHATS
                </span>
                <div className="list h-[30vh] text-md flex flex-col overflow-auto">
                  <ul>
                    <li
                      className={`pl-6 text-gray-700 flex gap-2 py-2 px-4 rounded-lg hover:bg-gray-200 cursor-pointer ${
                        selectedContent === "FAQ Page" ? "bg-gray-200" : ""
                      }`}
                      onClick={() => handleItemClick("FAQ Page")}
                    >
                      <HelpOutlineIcon className="scale-75" />
                      FAQ page
                    </li>
                  </ul>
                </div>
                <hr className="my-4 border-gray-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            Analytics Dashboard
          </h1>
          <div className="flex space-x-4 border-b pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-black"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "User Stats" && (
            <div className="mt-6">
              <div className="grid grid-cols-4 gap-4">
                {[
                  { title: "Total Users", value: "12,345", change: "+20%" },
                  { title: "Active Users", value: "8,765", change: "+15%" },
                  { title: "New Sign-ups", value: "1,234", change: "+10%" },
                  { title: "User Retention", value: "85%", change: "+5%" },
                ].map((stat) => (
                  <div
                    key={stat.title}
                    className="p-4 bg-white shadow rounded-lg"
                  >
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-green-500">
                      {stat.change} from last month
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-2">User Growth</h2>
                {/* Bar chart replacing the custom graph */}
                <div className="h-96 mt-2">
                  <Bar
                    data={{
                      labels: ["M 1", "M 2", "M 3", "M 4", "M 5"],
                      datasets: [
                        {
                          label: "User Growth",
                          data: [1400, 1600, 2000, 2300, 2600], // Data from the custom graph
                          backgroundColor: "#84cc16", // Light blue bars
                          borderColor: "#84cc16", // Same color for border
                          borderWidth: 2,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false, // Allow custom width and height for the chart
                      plugins: {
                        legend: {
                          position: "top", // Position of the legend (optional)
                        },
                      },
                      scales: {
                        x: {
                          ticks: {
                            font: {
                              size: 14, // Optional: Adjust font size for x-axis ticks
                            },
                          },
                        },
                        y: {
                          ticks: {
                            font: {
                              size: 14, // Optional: Adjust font size for y-axis ticks
                            },
                          },
                        },
                      },
                    }}
                    height={400} // Custom height for the Bar chart
                    width={600} // Custom width for the Bar chart
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "App Performance" && (
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                {
                  title: "Server Response Time",
                  value: "Average: 250ms",
                },
                {
                  title: "Client-side Performance",
                  value: "Average Load Time: 1.2s",
                },
                {
                  title: "Error Rate",
                  value: "0.12%",
                  change: "-0.05% from last month",
                },
              ].map((metric, idx) => (
                <div key={idx} className="p-4 bg-white shadow rounded-lg">
                  <p className="text-gray-600 text-sm">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </p>
                  {metric.change && (
                    <p className="text-xs text-green-500">{metric.change}</p>
                  )}
                  {/* Replaced custom graph with Chart.js Bar chart */}
                  <div className="h-40 mt-2">
                    <Bar data={chartData} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TrialDashboard;
