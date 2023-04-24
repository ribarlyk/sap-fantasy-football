import React, { useRef, useState } from "react";
import Chart from "react-apexcharts";

const ChartComponent = ({ stats }) => {
    const chartRef = useRef(null);
    const [chartOptions, setChartOptions] = useState({
        series: [
            {
                name: "Overall",
                data: [
                    stats.attack,
                    stats.defense,
                    stats.speed,
                    stats.agression,
                    stats.pace,

                    (stats.attack +
                        stats.defense +
                        stats.speed +
                        stats.agression +
                        stats.pace) /
                        5,
                ],
            },
        ],
        chart: {
            height: 270,
            type: "radar",

            toolbar: {
                show: false,
            },
        },
        markers: {
            size: 4,
            hover: {
                size: 6,
            },
        },
        
        xaxis: {
            categories: [
                "Attack",
                "Defence",
                "Speed",
                "Aggression",
                "Pace",
                "Overall",
            ],
        },
    });

    return (
        <div className="app">
            <Chart
                options={chartOptions}
                series={chartOptions.series}
                type={chartOptions.chart.type}
                height={chartOptions.chart.height}
                markers={chartOptions.markers}
                ref={chartRef}
            />
        </div>
    );
};

export default ChartComponent;
