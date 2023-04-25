import "./MySeason.scss";
import { useResultsContext } from "../../LiftingStates/ResultContext";
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ApexChart from "../Chart/ChartMyHistory";

export default function MySeason() {
    const [results, setResults] = useResultsContext();

    const navigate = useNavigate();
    const [history, setHistory] = useState(
        JSON.parse(sessionStorage.getItem("myHistory")) || []
    );
    const [uniqHistory, setUniqHistory] = useState([[{}]]);
    useEffect(() => {
        const flatArray = history.flat();
        const uniqueFlatArray = [
            ...new Set(flatArray.map((obj) => JSON.stringify(obj))),
        ].map((str) => JSON.parse(str));
        const uniqueNestedArray = uniqueFlatArray.reduce((acc, obj) => {
            const index = acc.findIndex((arr) =>
                arr.some((item) => item.id === obj.id)
            );
            if (index !== -1) {
                acc[index].push(obj);
            } else {
                acc.push([obj]);
            }
            return acc;
        }, []);
        setUniqHistory(uniqueNestedArray);
    }, [history]);

    const latestUserData = JSON.parse(sessionStorage.getItem("loggedUser"));

    const nameList = (
        <table className="my-team-history">
            <thead>
                <tr>
                    <th>HomeTeam</th>
                    <th>AwayTeam</th>
                    <th>Result</th>
                    <th>Possession</th>
                    <th>YellowCards</th>
                    <th>RedCards</th>
                    <th>ThrowIns</th>
                    <th>ShotsOnTarget</th>
                    <th>CornerKicks</th>
                    <th>Fouls</th>
                </tr>
            </thead>
            <tbody>
                {uniqHistory
                    .map((arr) =>
                        arr
                            .filter(
                                (game) =>
                                    game.homeTeam ===
                                        latestUserData.team.name ||
                                    game.awayTeam === latestUserData.team.name
                            )
                            .map((game) => {
                                return (
                                    <tr key={uniqid()}>
                                        <td
                                            key={uniqid()}
                                            className="team-name-data"
                                        >
                                            {game.homeTeam}
                                        </td>
                                        <td
                                            key={uniqid()}
                                            className="team-name-data"
                                        >
                                            {game.awayTeam}
                                        </td>
                                        <td key={uniqid()}>
                                            {game.homeGoals}-{game.awayGoals}
                                        </td>
                                        <td key={uniqid()}>
                                            {game.homePossession}/
                                            {game.awayPossession}
                                        </td>
                                        <td key={uniqid()}>
                                            {game.homeYellowCards}/
                                            {game.awayYellowCards}
                                        </td>
                                        <td key={uniqid()}>
                                            {game.homeRedCards}/
                                            {game.awayRedCards}
                                        </td>
                                        <td key={uniqid()}>
                                            {game.homeThrowIns}/
                                            {game.awayThrowIns}
                                        </td>
                                        <td key={uniqid()}>
                                            {game.homeShotsOnTarget}/
                                            {game.awayShotsOnTarget}
                                        </td>
                                        <td key={uniqid()}>
                                            {game.homeCornerKicks}/
                                            {game.awayCornerKicks}
                                        </td>
                                        <td key={uniqid()}>
                                            {game.homeFouls}/{game.awayFouls}
                                        </td>
                                    </tr>
                                );
                            })
                    )

                    .flat()}
            </tbody>
        </table>
    );

    const handleNextSeason = () => {
        window.scrollTo({
            top: 0,
        });

        setResults([]);
        sessionStorage.removeItem("myHistory");
        navigate("/standings");
    };

    return (
        <div className="my-season-container-wrapper">
            <div className="my-season-container">
                <div className="table-chart-container">
                    <div className="chart-container">
                        <ApexChart history={history} />
                    </div>
                    {nameList}
                </div>

                <Button onClick={handleNextSeason} variant="contained">
                    New Season
                </Button>
            </div>
        </div>
    );
}
