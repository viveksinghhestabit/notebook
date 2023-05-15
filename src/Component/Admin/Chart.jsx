import ApexOptions from "apexcharts";
import ReactApexChart from "react-apexcharts";

const Chart = (props) => {
  const { series, categories, type, format } = props;
  const chartData: ApexOptions = {
    series: series,
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: categories,
        labels: {
          format: format,
        }
      },
      tooltip: {
        x: {
          format: format,
        },
      },
    },
  };

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type={type}
      height={350}
    />
  );
};

export default Chart;
