import React from "react";
import ReactApexChart from "react-apexcharts";

export default function ApexChart() {
    const [options, setOptions] = React.useState({
        chart: {
            height: 350,
            type: "bar",
            width:600,
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: "top", // top, center, bottom
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + "%";
            },
            offsetY: -20,
            style: {
                fontSize: "12px",
                colors: ["#304758"],
            },
        },
        xaxis: {
            categories: [
                "Scored",
                "Conceeded",
                "Y Cards",
                "R Cards",
                "ThrowIns",
                "Shots",
                "Corners",
                "Fouls",
            ],
            position: "top",
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            crosshairs: {
                fill: {
                    type: "gradient",
                    gradient: {
                        colorFrom: "#D8E3F0",
                        colorTo: "#BED1E6",
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    },
                },
            },
            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val + "%";
                },
            },
        },
        title: {
            text: "Total Stats For The Season",
            floating: true,
            offsetY: 330,
            align: "center",
            style: {
                color: "#444",
            },
        },
    });

    const [series, setSeries] = React.useState([
        {
            name: "Inflation",
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3],
        },
    ]);

    return (
        <div id="chart">
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={350}
                width={700}
            />
        </div>
    );
}
