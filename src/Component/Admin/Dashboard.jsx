import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import * as api from "../../Api/index";

const Dashboard = () => {
  const [graphRange, setGraphRange] = useState(7);
  const [graphData, setGraphData] = useState({
    series: [],
    categories: [],
    format: "dd MMM",
  });
  const handleGraphRange1 = (e) => {
    setGraphRange(e.target.value);
  };

  const getGraphData = async () => {
    const response = await api.getGraphData(graphRange);
    const json = await response.data;
    if (json.errors) {
      console.log(json.errors);
      return;
    }
    const graph = {
      categories: json.data.dateArray,
      series: json.data.series,
      format: graphRange > 30 ? "MMM" : "dd MMM",
    };
    setGraphData(graph);
  };

  useEffect(() => {
    getGraphData();
  }, [graphRange]);

  return (
    <div className="container mt-2">
      <h1>Dashboard</h1>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="float-end">
                <select
                  className="form-select form-select-sm"
                  onChange={handleGraphRange1}
                >
                  <option value="7" selected>
                    Last 7 days
                  </option>
                  <option value="30">Last 30 days</option>
                  <option value="365">Last 1 year</option>
                </select>
              </div>
            </div>
          </div>
          <Chart
            series={graphData.series}
            categories={graphData.categories}
            type="area"
            format={graphData.format}
          />
        </div>
        <div className="col-md-6">
          <Chart
            series={graphData.series}
            categories={graphData.categories}
            type="bar"
            format={graphData.format}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
