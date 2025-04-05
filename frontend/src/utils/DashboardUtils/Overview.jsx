import React from "react";
import Counter from "../Counter"
import SwapVertIcon from "@mui/icons-material/SwapVert";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import { Line, Bar, Pie } from "react-chartjs-2"; // Import Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale,
} from "chart.js";
import NewLineChart from "./NewLineChart";
import BetterAreaChart from "./BetterAreaChart";
import BarChart from "./NewBarChart";
import NewBarChart from "./NewBarChart";
import RadarChart from "./RadarChart";
import AreaChart from "./NewAreaChart";
import NewPieChart from "./NewPieChart";
import BetterPieChart from "./BetterPieChart";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  RadialLinearScale
);

const Overview = () => {


  const revenueData = [
    { x: "plane", us: 400, france: 300, japan: 200 },
    { x: "helicopter", us: 380, france: 290, japan: 180 },
    { x: "boat", us: 350, france: 270, japan: 150 },
    { x: "train", us: 420, france: 310, japan: 220 },
    { x: "subway", us: 460, france: 330, japan: 250 },
    { x: "bus", us: 490, france: 350, japan: 270 },
    { x: "car", us: 510, france: 370, japan: 300 },
  ];

  const salesQuantity = [
    { x: "AD", donut: 100, fries: 200, kebab: 150, sandwich: 180 },
    { x: "AE", donut: 120, fries: 220, kebab: 170, sandwich: 200 },
    { x: "AF", donut: 90, fries: 180, kebab: 140, sandwich: 160 },
    { x: "AG", donut: 130, fries: 240, kebab: 180, sandwich: 210 },
    { x: "AI", donut: 150, fries: 260, kebab: 200, sandwich: 230 },
  ];

  // Data for the revenue chart (Line Chart)
  const revenueChartData = {
    labels: revenueData.map((d) => d.x),
    datasets: [
      {
        label: "US",
        data: revenueData.map((d) => d.us),
        borderColor: "rgb(140, 110, 200)", // Darker light purple with gray undertone
        backgroundColor: "rgba(140, 110, 200, 0.3)", // Darker light purple with gray undertone
        fill: true,
      },
      {
        label: "France",
        data: revenueData.map((d) => d.france),
        borderColor: "rgb(120, 90, 180)", // Deeper lavender with more purple
        backgroundColor: "rgba(120, 90, 180, 0.3)", // Dark lavender with purple undertone
        fill: true,
      },
      {
        label: "Japan",
        data: revenueData.map((d) => d.japan),
        borderColor: "rgb(100, 70, 160)", // Darker medium purple-gray
        backgroundColor: "rgba(100, 70, 160, 0.3)", // Darker purple with grayish tint
        fill: true,
      },
    ],
  };

  // Data for the sales quantity chart (Bar Chart)
  const salesQuantityChartData = {
    labels: salesQuantity.map((d) => d.x),
    datasets: [
      {
        label: "Donut",
        data: salesQuantity.map((d) => d.donut),
        backgroundColor: "rgba(140, 110, 200, 0.9)", // Darker light purple with gray undertone
        borderColor: "rgb(140, 110, 200)", // Darker light purple
        borderWidth: 2,
      },
      {
        label: "Fries",
        data: salesQuantity.map((d) => d.fries),
        backgroundColor: "rgba(120, 90, 180, 0.9)", // Deeper lavender with purple undertone
        borderColor: "rgb(120, 90, 180)", // Darker lavender
        borderWidth: 2,
      },
      {
        label: "Kebab",
        data: salesQuantity.map((d) => d.kebab),
        backgroundColor: "rgba(100, 70, 160, 0.9)", // Darker purple with grayish tint
        borderColor: "rgb(100, 70, 160)", // Dark purple-gray
        borderWidth: 2,
      },
      {
        label: "Sandwich",
        data: salesQuantity.map((d) => d.sandwich),
        backgroundColor: "rgba(80, 60, 140, 0.9)", // Darker deep purple with gray undertone
        borderColor: "rgb(80, 60, 140)", // Dark purple with a gray undertone
        borderWidth: 2,
      },
    ],
  };

  // Data for the campaign chart (Pie Chart)
  const campaignChartData = {
    labels: ["Social Media", "Email Marketing", "Referral"],
    datasets: [
      {
        data: [40, 30, 20],
        backgroundColor: [
          "rgb(140, 110, 200)", // Darker light purple with gray undertone
          "rgb(120, 90, 180)", // Deeper lavender with purple undertone
          "rgb(100, 70, 160)", // Darker purple with grayish tint
        ],
        hoverBackgroundColor: [
          "rgb(140, 110, 200)", // Darker light purple with gray undertone
          "rgb(120, 90, 180)", // Darker lavender
          "rgb(100, 70, 160)", // Darker purple-gray
        ],
        borderColor: "rgb(180, 200, 200)", // Set borderColor to transparent
        borderWidth: 1, // Ensure no border width is applied
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-transparent text-white">
      {/* Summary Stats */}
      <div className="col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-neutral-800/40 border flex gap-4 border-gray-300/30 backdrop-blur-sm p-3 rounded-lg text-center">
          <MailOutlineRoundedIcon className="text-amber-600/90" />
          <div>
            Emails Sent: <Counter value={1261} />
          </div>
        </div>
        <div className="bg-neutral-800/40 flex border border-gray-300/30 backdrop-blur-sm p-3 rounded-lg text-center">
          <CurrencyRupeeRoundedIcon className="text-green-500/90" />
          <div>
            Sales Obtained: <Counter value={4325} />
          </div>
        </div>
        <div className="bg-neutral-800/40 flex gap-4 border border-gray-300/30 backdrop-blur-sm p-3 rounded-lg text-center">
          <PersonAddIcon className="text-yellow-500/90" />
          <div>
            New Clients: <Counter value={3241} />
          </div>
        </div>
        <div className="bg-neutral-800/40 flex gap-4 border border-gray-300/30 backdrop-blur-sm p-3 rounded-lg text-center">
          <SwapVertIcon className="text-purple-400/90" />
          <div>
            Traffic: <Counter value={1324} />
          </div>
        </div>
      </div>

      {/* Revenue Generated Chart */}
      <div className="bg-neutral-800/40 pl-5 border border-gray-300/30 backdrop-blur-sm p-4 rounded-lg shadow-lg col-span-2">
        <div className="text-lg mb-3 opacity-70">Revenue Generated</div>
        {/* <Line data={revenueChartData}  /> */}
        <BetterAreaChart />
      </div>

      {/* Campaign Chart */}
      <div className="bg-neutral-800/40 border border-gray-300/30 backdrop-blur-sm h-[55vh] p-4 rounded-lg shadow-lg">
        <div className="text-lg mb-3 opacity-70">Campaign</div>
        {/* <Pie data={campaignChartData} width={350} height={500} /> */}
        <BetterPieChart />
      </div>

      {/* Sales Quantity Chart */}
      <div className="bg-neutral-800/40 border border-gray-300/30 backdrop-blur-sm p-4 rounded-lg shadow-lg col-span-2">
        <div className="text-lg mb-3 opacity-70">Sales Quantity</div>
        <Bar data={salesQuantityChartData} />
      </div>

      {/* Geography Based Traffic */}
      <div className="bg-neutral-800/40 backdrop-blur-sm border border-gray-300/30 p-4 rounded-lg shadow-lg">
        <div className="text-lg mb-3 opacity-70">Geography Based Traffic</div>
        {/* Placeholder for a map component */}
        <div className="bg-transparent rounded-lg flex items-center scale-110 justify-center">
          {/* <span className="text-gray-400">Map Placeholder</span> */}
          <NewBarChart />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-neutral-800/40 border border-gray-300/30 backdrop-blur-sm p-4 rounded-lg shadow-lg col-span-3">
        <div className="text-lg mb-3 opacity-70">Recent Transactions</div>
        <ul>
          <li className="flex justify-between border-b border-neutral-700 py-2 text-sm">
            <span>01e4dsa - johndoe</span>
            <span className="text-green-400">$43.95</span>
          </li>
          <li className="flex justify-between border-b border-neutral-700 py-2 text-sm">
            <span>0315dsaa - jackdower</span>
            <span className="text-green-400">$133.45</span>
          </li>
          <li className="flex justify-between border-b border-neutral-700 py-2 text-sm">
            <span>01e4dsa - aberjohnny</span>
            <span className="text-green-400">$43.95</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Overview;
