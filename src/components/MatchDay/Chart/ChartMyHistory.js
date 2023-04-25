import React from "react";
import ReactApexChart from "react-apexcharts";

export default function ApexChart({ history }) {
    const [options, setOptions] = React.useState({
        chart: {
            height: 350,
            type: "bar",
            width: 600,
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: "top",
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val;
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
                        colorFrom: "#1976D2",
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
                    return val;
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
                fontSize:"22px",
            },
        },
    });

    const [series, setSeries] = React.useState([
        {
            name: "Inflation",
            data: dataParcer(),
        },
    ]);

    function dataParcer() {
        const user = JSON.parse(sessionStorage.getItem("loggedUser"));

        let homeGames = history.map((arr) =>
            arr
                .filter((game) => game.homeTeam === user.team.name)
                .map((game) => game)
        );
        let awayGames = history.map((arr) =>
            arr
                .filter((game) => game.awayTeam === user.team.name)
                .map((game) => game)
        );
        homeGames = homeGames
            .filter((array) => array.length > 0)
            .map((bango) => bango[0]);
        awayGames = awayGames
            .filter((array) => array.length > 0)
            .map((bango) => bango[0]);
        awayGames.reduce((a, b) => a + b.awayYellowCards, 0);
        let scoredGoals =
            homeGames.reduce((a, b) => a + b.homeGoals, 0) +
            awayGames.reduce((a, b) => a + b.awayGoals, 0);
        let conceededgoals =
            homeGames.reduce((a, b) => a + b.awayGoals, 0) +
            awayGames.reduce((a, b) => a + b.homeGoals, 0);
        let yellowCards =
            homeGames.reduce((a, b) => a + b.homeYellowCards, 0) +
            awayGames.reduce((a, b) => a + b.awayYellowCards, 0);
        let redCards =
            homeGames.reduce((a, b) => a + b.homeRedCards, 0) +
            awayGames.reduce((a, b) => a + b.awayRedCards, 0);
        let fouls =
            homeGames.reduce((a, b) => a + b.homeFouls, 0) +
            awayGames.reduce((a, b) => a + b.awayFouls, 0);
        let throwIns =
            homeGames.reduce((a, b) => a + b.homeThrowIns, 0) +
            awayGames.reduce((a, b) => a + b.awayThrowIns, 0);
        let corners =
            homeGames.reduce((a, b) => a + b.homeCornerKicks, 0) +
            awayGames.reduce((a, b) => a + b.awayCornerKicks, 0);
        let homeShotsOnTarget = homeGames.reduce(
            (a, b) => a + b.homeShotsOnTarget,
            0
        );

        return [
            scoredGoals,
            conceededgoals,
            yellowCards,
            redCards,
            throwIns,
            homeShotsOnTarget,
            corners,
            fouls,
        ];
    }

    return (
        <div id="chart">
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={360}
                width={1000}
            />
        </div>
    );
}
