import { ChartData, ChartDataset, ChartOptions } from "chart.js/auto";
import Chart from "../../base-components/Chart";
import { getColor } from "../../utils/colors";

import { useMemo } from "react";

interface MainProps extends React.ComponentPropsWithoutRef<"canvas"> {
  width: number;
  height: number;
  labels: string[]
  datasets:  ChartDataset[];
}



function Main(props: MainProps) {

  const data: ChartData = useMemo(() => {
    return {
      labels: props.labels,
      datasets: props.datasets
    };
  }, [props]);

  const options: ChartOptions = useMemo(() => {
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: getColor("black", 1),
          },
        },
        
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 12,
            },
            color: getColor("slate.500", 0.8),
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            font: {
              size: 12,
            },
            color: getColor("black", 0.8),
            callback: function (value) {
              return `${value} Menit`;
            },
          },
          grid: {
            color: getColor("slate.100", 0.8),
            // color: darkMode
            //   ? getColor("slate.500", 0.3)
            //   : getColor("slate.300"),
            borderDash: [1, 1],
            drawBorder: false,
            
          },
        },
      },
    };
  }, [props]);

  return (
    <Chart
      type="bar"
      width={props.width}
      height={props.height}
      data={data}
      options={options}
      className={props.className}
    />
  );
}

Main.defaultProps = {
  width: "auto",
  height: "auto",
  className: "",
};

export default Main;
