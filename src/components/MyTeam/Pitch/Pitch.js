import "./Pitch.scss";
import { useEffect, useState, useRef } from "react";
import Animations from "../SkeletonPlayers";
import uniqid from "uniqid";
import ShirtButton from "../ShirtButton";
import PaginationOutline from "../Pagination/Pagination";
import BasicModal from "../Modal/Modal";
import levski from "../../../assets/images/jerseys/levski.webp";
import goalkeeperJersey from "../../../assets/images/jerseys/long-sleeve -goalkeeper.png=z-0,0_f-webp";
import defenderJersey from "../../../assets/images/jerseys/juventus.png=z-0,0_f-webp";
import midfielderJersey from "../../../assets/images/jerseys/arsenal;.png=z-0,0_f-webp";
import attackerJersey from "../../../assets/images/jerseys/brasilyellow.png=z-0,0_f-webp";
import dummyJersey from "../../../assets/images/jerseys/no-player.png=z-0,0_f-webp";
import SearchBar from "../SearchBar/SearchBar";
import TeamName from "../TeamName/TeamName";
import { fetchData } from "../../utils/fetch";
import AddPicture from "../AddPicture/AddPicture";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Pitch() {
    const [loggedUser, setLoggedUser] = useState(
        JSON.parse(localStorage.getItem("loggedUser")) || {}
    );
    const [players, setPlayers] = useState("");
    const [searchPlayers, setSearchPlayers] = useState("");
    const [loading, setLoading] = useState(false);
    const [goalkeeper, setGoalkeeper] = useState([]);
    const [defender, setDefender] = useState([]);
    const [midfielder, setMidfielder] = useState([]);
    const [attacker, setAttacker] = useState([]);
    const [page, setPage] = useState(1);
    const [budget, setBudget] = useState(
        JSON.parse(localStorage.getItem("loggedUser")).budget || 450
    );
    const [substitute, setSubstitute] = useState([]);
    const [myTeam, setMyTeam] = useState("");
    const [isTeamChoosen, setIsTeamChoosen] = useState(
        !!JSON.parse(localStorage.getItem("loggedUser")).team
    );
    const [nameClass, setNameClass] = useState(false);
    const [playerIn, setPlayerIn] = useState(null);
    const [isChange, setIsChange] = useState(false);
    const [isTeamSaved, setIsTeamSaved] = useState(
        !!JSON.parse(localStorage.getItem("loggedUser")).team || false
    );
    const [input, setInput] = useState("");
    const [teamName, setTeamName] = useState(
        JSON.parse(localStorage.getItem("loggedUser"))?.team?.name || ""
    );
    const [isNameSaved, setIsNameSaved] = useState(false);
    const [sumBuy, setSumBuy] = useState(null);
    const [myLogo, setMyLogo] = useState(
        JSON.parse(localStorage.getItem("loggedUser"))?.team?.logo || null
    );
    const [clickedPlayers, setClickedPlayers] = useState([]);
    const buttonRef = useRef(null);
    const [addOrRemove, setAddOrRemove] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const team = JSON.parse(localStorage.getItem("loggedUser"));
        setMyTeam(team.team || []);
        setLoggedUser(team);
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = users.findIndex((u) => u.username === team.username);
        if (userIndex !== -1) {
            users[userIndex].team = team.team;
            localStorage.setItem("users", JSON.stringify(users));
        }
    }, [isChange]);

    useEffect(() => {
        fetchData(`page=${page}`, {
            headers: {
                "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
                "X-RapidAPI-Key":
                    "9a511f7146mshe0fab5844669c1dp1c1c5fjsn55edffb40906",
            },
        })
            .then((data) => {
                setLoading(true);
                setPlayers(data);
            })
            .catch((err) => {
                setLoading(!loading);
            });
        fetchData(
            `search=${input}`,

            {
                headers: {
                    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
                    "X-RapidAPI-Key":
                        "9a511f7146mshe0fab5844669c1dp1c1c5fjsn55edffb40906",
                },
            }
        )
            .then((data) => {
                setLoading(true);
                setSearchPlayers(data);
            })
            .catch((err) => {
                setLoading(!loading);
            });
    }, [page, input]); // да се изкара в папкa service и да се ползва axios

    // const updateUserTeam = (user, team) => {
    //     // Update the user's team in the users array
    //     console.log(user, team);
    //     let users = JSON.parse(localStorage.getItem("users")) || [];
    //     const userIndex = users.findIndex((u) => u.username === user.username);
    //     if (userIndex !== -1) {
    //         users[userIndex].team =
    //             users[userIndex].team != null
    //                 ? [...users[userIndex].team]
    //                 : team;
    //         localStorage.setItem("users", JSON.stringify(users));
    //     }

    //     const updatedLoggedUser = { ...user, team };
    //     console.log(updatedLoggedUser);
    //     localStorage.setItem("loggedUser", JSON.stringify(updatedLoggedUser));
    //     setLoggedUser(updatedLoggedUser);
    // };
    const updateUserTeam = (user, team) => {
        // Update the user's team in the users array
        console.log(user, team);
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = users.findIndex((u) => u.username === user.username);
        if (userIndex !== -1) {
            users[userIndex].team = team;
            // users[userIndex].team != null
            //     ? [...users[userIndex].team]
            //     : team;
            localStorage.setItem("users", JSON.stringify(users));
        }

        const updatedUser = { ...user, team };
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        let updatedUserInfo = Object.assign(loggedUser, updatedUser);
        const updatedLoggedUser = { ...loggedUser, ...updatedUser };
        localStorage.setItem("loggedUser", JSON.stringify(updatedLoggedUser));
        setLoggedUser(updatedLoggedUser);
    };

    const createPlayerSection = (containerClass, heading, role) => {
        let dataCheck = input ? searchPlayers : "";
        const data = dataCheck || players;
        return (
            <>
                <div className="header-data"> {heading}</div>
                <table id="table-pitch" className={containerClass}>
                    <tbody>
                        {!loading ? (
                            <tr>
                                <td>
                                    <Animations />
                                </td>
                            </tr>
                        ) : (
                            Array.isArray(data.response) &&
                            data.response
                                .filter(
                                    (x) =>
                                        x.statistics[0].games.position === role
                                )
                                .map((x) => {
                                    return (
                                        <tr key={uniqid()}>
                                            <td>
                                                <img
                                                    width="30"
                                                    height="30"
                                                    src={
                                                        x.statistics[0].team
                                                            .logo
                                                    }
                                                ></img>
                                            </td>
                                            <td>
                                                {x.player.firstname}{" "}
                                                {x.player.lastname}
                                            </td>
                                            <td>{x.player.age || 10} $</td>
                                            <td>
                                                {/* <button
                                                    className="add-remove-btn"
                                                    onClick={(e) => {
                                                        onPlayerClickHandler(
                                                            e,
                                                            x
                                                        );
                                                    }}
                                                >
                                                    Add
                                                </button> */}

                                                {!myLogo ? (
                                                    <button
                                                        ref={buttonRef}
                                                        className="add-remove-btn"
                                                        onClick={(e) => {
                                                            onPlayerClickHandler(
                                                                e,
                                                                x
                                                            );
                                                        }}
                                                    >
                                                        {clickedPlayers.includes(
                                                            x
                                                        )
                                                            ? "Remove"
                                                            : "Add"}
                                                    </button>
                                                ) : null}
                                            </td>
                                        </tr>
                                    );
                                })
                        )}
                    </tbody>
                </table>
            </>
        );
    };

    const playersAddRemoveHandler = (
        position,
        arrayLength,
        player,
        jersey,
        setter
    ) => {
        let exist = position.filter((d) => {
            return d.player.name === player.player.name;
        });

        if (position.length < arrayLength && exist.length === 0) {
            player.jersey = jersey;
            setter((prev) => [...prev, player]);
        } else {
            let updatedList = position.filter(
                (g) => g.player.name !== player.player.name
            );
            setter(updatedList);
        }
    };

    const onPlayerClickHandler = (event, player) => {
        setAddOrRemove(event.target.textContent);
        console.log(event.target.textContent);

        let sumToBuy = player.player.age || 10;
        let position = player.statistics[0].games.position;
        setSumBuy(sumToBuy);

        if (clickedPlayers.includes(player)) {
            setClickedPlayers(
                clickedPlayers.filter(
                    (clickedPlayer) => clickedPlayer !== player
                )
            );
        } else {
            setClickedPlayers([...clickedPlayers, player]);
        } //new add-on for add/remove btn

        if (position === "Goalkeeper") {
            playersAddRemoveHandler(
                goalkeeper,
                1,
                player,
                goalkeeperJersey,
                setGoalkeeper
            );
        } else if (position === "Defender") {
            playersAddRemoveHandler(
                defender,
                4,
                player,
                defenderJersey,
                setDefender
            );
        } else if (position === "Midfielder") {
            playersAddRemoveHandler(
                midfielder,
                4,
                player,
                midfielderJersey,
                setMidfielder
            );
        } else if (position === "Attacker") {
            playersAddRemoveHandler(
                attacker,
                2,
                player,
                attackerJersey,
                setAttacker
            );
        }
        player.agression = Math.floor(Math.random() * 10);
        player.pace = Math.floor(Math.random() * 10);
        player.speed = Math.floor(Math.random() * 10);
        player.defense = Math.floor(Math.random() * 10);
        player.attack = Math.floor(Math.random() * 10);
        if (
            goalkeeper.length >= 1 &&
            defender.length >= 4 &&
            midfielder.length >= 4 &&
            attacker.length >= 2
        ) {
            setSubstitute((prev) => [...prev, player]);
            player.jersey = levski;
        }

        if (substitute.length === 4) {
            setIsTeamChoosen(!isTeamChoosen);
        }

        if (budget - sumToBuy < 0) {
            alert("not enought money");
        } else if (substitute.length > 4) {
            alert("team already chosen"); //todo popup instead of alert
        }
    };

    const budgetSetHandler = (sumToBuy) => {
        let updatedBudget;
        console.log(addOrRemove);
        if (addOrRemove === "Add") {
            updatedBudget = Number(budget) - Number(sumToBuy);
            console.log("=");
        } else {
            updatedBudget = Number(budget) + Number(sumToBuy);
            console.log("=12");
        }
        console.log(updatedBudget);
        setBudget(updatedBudget);
        localStorage.setItem("budget", JSON.stringify(updatedBudget));

        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        const updatedLoggedUser = {
            ...loggedUser,
            budget: updatedBudget,
        };

        const users = JSON.parse(localStorage.getItem("users"));
        const updatedUsers = users.map((user) => {
            if (user.username === loggedUser.username) {
                return updatedLoggedUser;
            } else {
                return user;
            }
        });
        console.log(updatedLoggedUser);
        localStorage.setItem("loggedUser", JSON.stringify(updatedLoggedUser));
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    };

    useEffect(() => {
        budgetSetHandler(sumBuy);
    }, [sumBuy, addOrRemove]);

    const saveTeamHandler = () => {
        const currentTeam = [
            ...goalkeeper,
            ...defender,
            ...midfielder,
            ...attacker,
            ...substitute,
        ];

        setMyTeam(currentTeam);

        updateUserTeam(loggedUser, currentTeam, budget, teamName);

        setIsTeamSaved(!isTeamSaved);

        setOpenSnackbar(true);
    };

    // if (myTeam.length > 0) {
    //     let teams = JSON.parse(localStorage.getItem("loggedUser")).team || [
    //         ...goalkeeper,
    //         ...defender,
    //         ...midfielder,
    //         ...attacker,
    //         ...substitute,
    //     ];
    //     const user = JSON.parse(localStorage.getItem("loggedUser"));
    //     user.team = teams;
    //     localStorage.setItem("loggedUser", JSON.stringify(user));
    // }

    const onPlayerChangeHandler = (bool, playerRotate) => {
        setNameClass(bool);
        setPlayerIn(playerRotate);
        setIsChange(!isChange);
        return playerIn;
    };

    const rowGenerator = (pos, styleClass, localIndex, stateIndex) => {
        // console.log(loggedUser
        //     );
        // console.log(loggedUser?.team?.players[localIndex]?.statistics[0]?.games?.position);
        return (
            <div className={styleClass}>
                {isTeamSaved ? (
                    <BasicModal
                        name={
                            loggedUser.team[localIndex]?.player?.name ||
                            loggedUser.team.players[localIndex]?.player?.name
                                ? loggedUser.team[localIndex]?.player?.name ||
                                  loggedUser.team.players[localIndex]?.player
                                      ?.name
                                : pos[stateIndex]?.player?.name
                        }
                        onPlayerChangeHandler={onPlayerChangeHandler}
                        playerStats={
                            loggedUser.team[localIndex]?.player?.name ||
                            loggedUser.team.players[localIndex]?.player?.name
                                ? loggedUser.team[localIndex]?.player ||
                                  loggedUser.team.players[localIndex]?.player
                                : pos[stateIndex]?.player?.name
                        }
                        stats={
                            loggedUser.team[localIndex]?.player?.name ||
                            loggedUser.team.players[localIndex]?.player?.name
                                ? loggedUser.team[localIndex] ||
                                  loggedUser.team.players[localIndex]
                                : pos[stateIndex]?.player?.name
                        }
                    />
                ) : null}
                {loggedUser.team ? (
                    <ShirtButton
                        isChange={isChange}
                        setIsChange={setIsChange}
                        onPlayerChangeHandler={onPlayerChangeHandler}
                        localStorageTeam={
                            loggedUser.team.length
                                ? loggedUser.team
                                : loggedUser.team.players
                        } // updated prop name
                        position={
                            loggedUser?.team[localIndex]?.statistics[0]?.games
                                ?.position ||
                            loggedUser?.team?.players[localIndex]?.statistics[0]
                                ?.games?.position
                            //      &&
                            // loggedUser.team?.players?.players[localIndex]
                            //     ?.statistics[0]?.games?.position
                        }
                        name={
                            loggedUser.team[localIndex]?.player?.name ??
                            loggedUser.team?.players[localIndex]?.player.name
                        }
                        jersey={
                            loggedUser.team[localIndex] ??
                            loggedUser.team.players
                                ? loggedUser?.team[localIndex]?.jersey ??
                                  loggedUser.team.players[localIndex].jersey
                                : dummyJersey
                        }
                    />
                ) : (
                    <ShirtButton
                        position={pos[stateIndex]?.statistics[0].games.position}
                        name={pos[stateIndex]?.player?.name}
                        jersey={
                            pos[stateIndex]
                                ? pos[stateIndex].jersey
                                : dummyJersey
                        }
                    />
                )}
            </div>
        );
    };

    const searchBarHandler = (event, key, payload) => {
        event.preventDefault();
        setInput(event.target.value);
    };

    const teamNameHandler = (teamName, isSaved) => {
        setTeamName(teamName);
        setIsNameSaved(isSaved);

        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

        const updatedLoggedUser = {
            ...loggedUser,
            team: {
                name: teamName,
                budget: budget,
                wins: 0,
                draws: 0,
                loses: 0,
                scoredgoals: 0,
                conceededgoals: 0,
                points: 0,
                players: myTeam,
                logo: localStorage.getItem("image"),
            },
        };
        setMyLogo(localStorage.getItem("image"));
        const users = JSON.parse(localStorage.getItem("users"));
        const updatedUsers = users.map((user) => {
            if (user.username === loggedUser.username) {
                return updatedLoggedUser;
            } else {
                return user;
            }
        });

        localStorage.setItem("loggedUser", JSON.stringify(updatedLoggedUser));
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    };
    // const logoHandler = (result) => {
    //     setMyLogo(result);
    // };
    return (
        <>
            <div className="container">
                <div className="pitch-container">
                    <div className="budget-container">
                        <div className="logo-container">
                            {myLogo ? (
                                <img src={myLogo} alt="my-logo"></img>
                            ) : (
                                <AddPicture className="add-picture" />
                            )}
                        </div>
                        <div className="team-name-container">
                            {teamName ? (
                                <h2>Team Name : {teamName}</h2>
                            ) : (
                                <TeamName teamNameHandler={teamNameHandler} />
                            )}
                        </div>

                        <h2>Budget: {budget}/450 $</h2>
                    </div>
                    <div className="pitch-background">
                        <div
                            className={
                                !nameClass ? "row-one" : "row-one-change"
                            }
                        >
                            {rowGenerator(goalkeeper, "goalkeeper", 0, 0)}
                        </div>

                        <div
                            className={
                                !nameClass ? "row-two" : "row-two-change"
                            }
                        >
                            {rowGenerator(defender, "defender", 1, 0)}
                            {rowGenerator(defender, "defender", 2, 1)}
                            {rowGenerator(defender, "defender", 3, 2)}
                            {rowGenerator(defender, "defender", 4, 3)}
                        </div>

                        <div
                            className={
                                !nameClass ? "row-three" : "row-three-change"
                            }
                        >
                            {rowGenerator(midfielder, "midfielder", 5, 0)}
                            {rowGenerator(midfielder, "midfielder", 6, 1)}
                            {rowGenerator(midfielder, "midfielder", 7, 2)}
                            {rowGenerator(midfielder, "midfielder", 8, 3)}
                        </div>

                        <div
                            className={
                                !nameClass ? "row-four" : "row-four-change"
                            }
                        >
                            {rowGenerator(attacker, "striker", 9, 0)}
                            {rowGenerator(attacker, "striker", 10, 1)}
                        </div>

                        <div className="row-five">
                            <div
                                className={nameClass ? "substitute-one" : null}
                            >
                                {rowGenerator(substitute, null, 11, 0)}
                            </div>
                            <div
                                className={nameClass ? "substitute-two" : null}
                            >
                                {rowGenerator(substitute, null, 12, 1)}
                            </div>
                            <div
                                className={
                                    nameClass ? "substitute-three" : null
                                }
                            >
                                {rowGenerator(substitute, null, 13, 2)}
                            </div>
                            <div
                                className={nameClass ? "substitute-four" : null}
                            >
                                {rowGenerator(substitute, null, 14, 3)}
                            </div>
                            <div
                                className={nameClass ? "substitute-five" : null}
                            >
                                {rowGenerator(substitute, null, 15, 4)}
                            </div>
                        </div>
                    </div>
                    {/* {true ? <PopUpSuccess /> : null} TODO massege for saving team*/}
                    {isTeamChoosen ? (
                        <button
                            onClick={() => {
                                saveTeamHandler();
                            }}
                            className="save-team-button"
                            disabled={isTeamSaved}
                        >
                            Save Team
                        </button>
                    ) : null}
                    {/* {isTeamChoosen
                        ? <button className="set-captain" >Set Captain</button>
                        : null} TODO SET CAPTAIN OPTIONAL*/}
                </div>
                <div className="players-container">
                    <SearchBar
                        searchBarHandler={searchBarHandler}
                        input={input}
                    />

                    {createPlayerSection(
                        "goalkeepers",
                        "GOALKEEPERS",
                        "Goalkeeper"
                    )}
                    {createPlayerSection("defenders", "DEFENDERS", "Defender")}
                    {createPlayerSection(
                        "midfielders",
                        "MIDFIELDERS",
                        "Midfielder"
                    )}
                    {createPlayerSection("attackers", "ATTACKERS", "Attacker")}
                    <PaginationOutline
                        setPage={setPage}
                        page={page}
                        setLoading={setLoading}
                        loading={loading}
                    />
                </div>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity="success"
                >
                    Team saved successfully!
                </Alert>
            </Snackbar>
        </>
    );
}
