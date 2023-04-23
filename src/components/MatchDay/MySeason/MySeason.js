import "./MySeason.scss";
import { useResultsContext } from "../../LiftingStates/ResultContext";
import { useUserContext } from "../../LiftingStates/UserContext";
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ApexChart from "../Chart/ChartMyHistory";

export default function MySeason() {
    const [results, setResults] = useResultsContext();
    const [user, setUser, username, setUsername] = useUserContext();

    const navigate = useNavigate();
    const [history, setHistory] = useState(
        JSON.parse(sessionStorage.getItem("myHistory")) || []
    );

    // useEffect(() => {
    //     setHistory((prev) => [...prev, results]);
    //     sessionStorage.setItem(
    //         "myHistory",
    //         JSON.stringify([...history, results])
    //     );
    // }, []);
    const latestUserData = JSON.parse(sessionStorage.getItem("loggedUser"));

    console.log(latestUserData);

    const nameList = (
        <table className="my-team-history">
            <thead>
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
            </thead>
            <tbody>
                {history
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
                                    <tr>
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
        setResults([]);
        sessionStorage.removeItem("myHistory");
        navigate("/standings");
    };

    return (
        <div className="my-season-container-wrapper">
            <div className="my-season-container">
                {/* {history.map((game) => game).filter((game) => game.homeTeam)} */}
                <div className="table-chart-container">
                    {nameList}
                    <div className="chart-container">
                        <ApexChart />
                    </div>
                </div>

                <Button onClick={handleNextSeason} variant="contained">
                    New Season
                </Button>
            </div>
        </div>
    );
}
