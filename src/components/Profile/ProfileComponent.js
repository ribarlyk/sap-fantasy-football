import React, { useState, useEffect, useContext, useMemo } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
    Container,
    Grid,
    TextField,
    Avatar,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeProfilePic } from "../store/profileSlice";
import "./Profile.scss";
import { ProfileProvider } from "../LiftingStates/ProfileContext";
import { useProfileContext } from "../LiftingStates/ProfileContext";

const teams = [
    {
        name: "Arsenal",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToJgJkWwmSScqfnn2fUbesDw4arWE86f7RSLLlVzKnTA&s",
    },
    {
        name: "Liverpool",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHFMjY7USf0KsauKDB_eTdlByujAnsdZswxx9BAuZBKQ&s",
    },
    {
        name: "Manchester United",
        logo: "https://www.freepnglogos.com/uploads/manchester-united-logo-png/manchester-united-logo-manchester-united-wallpapers-wallpaper-cave-0.png",
    },
    {
        name: "Newcastle",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfcmxJMfvSxI6yMipyrBWf1LKyBPg1naWDvweXPxTFsg&s",
    },
    {
        name: "Aston Villa ",
        logo: "https://logodownload.org/wp-content/uploads/2019/10/aston-villa-logo-0.png",
    },
    {
        name: "Leeds United",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Wgo15RQcCQh4UriDzxuMIhZ1J7UePf_msYJPLIpm9Q&s",
    },
    {
        name: "Chelsea",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmwkkXH94svbGmL_kg4nYyxTH2bp7qVv0Dj5uBMNm1gA&s",
    },
    {
        name: "Everton",
        logo: "https://logodownload.org/wp-content/uploads/2019/04/everton-logo-escudo-0.png",
    },
    {
        name: "Leicester City",
        logo: "https://logodownload.org/wp-content/uploads/2019/05/leicester-city-logo-2.png",
    },
    {
        name: "Nottingham Forest",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjiX1_ZweIyiIQvezrCemAU3pXR6UpJyZMD2QV6rzSvA&s",
    },
    {
        name: "Southampton",
        logo: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c4ea.png",
    },
    {
        name: "West Ham United",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3MG4a241NMGspPFDAJeoFI9TrfPcTqdYVw2VErwGJ&s",
    },
    {
        name: "Crystal Palace",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0NNc0bvjphak4EsKjlVUtgwehUzEImg1i-cgOjDyZ&s",
    },
    {
        name: "Brighton",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFbFh-dDnHgGbYK_jdBDTicoFc_VnWK7jVP8kJJ115yQ&s",
    },
    {
        name: "Wolverhampton Wanderers",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR-l3w4i6_jrSZWwWDEEzKseZsQhmPP9w04CqtgBr-qw&s",
    },
    {
        name: "Manchester City",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Nw_R-JJ-sDdmthEyMlJvpyDHwlRrOCo5RNkxRdX3XA&s",
    },
    {
        name: "Fulham",
        logo: "https://logos-download.com/wp-content/uploads/2018/09/FC_Fulham_Logo.png",
    },
    {
        name: "Bournemouth",
        logo: "https://logodownload.org/wp-content/uploads/2019/10/bournemouth-fc-logo-0.png",
    },
    {
        name: "Brentford",
        logo: "https://logodownload.org/wp-content/uploads/2022/09/brentford-fc-logo-1.png",
    },
    {
        name: "Tottenham Hotspur",
        logo: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4ee.png",
    },
];

const ProfilePage = () => {
    const [firstName, setFirstName] = useState(
        JSON.parse(localStorage.getItem("loggedUser"))?.profile?.firstName || null
    );
    const [lastName, setLastName] = useState(
        JSON.parse(localStorage.getItem("loggedUser"))?.profile?.lastName || null
    );
    const [dateOfBirth, setDateOfBirth] = useState(
        JSON.parse(localStorage.getItem("loggedUser"))?.profile?.dateOfBirth || null
    );
    const [favoriteTeam, setFavoriteTeam] = useState(
        JSON.parse(localStorage.getItem("loggedUser"))?.profile?.favoriteTeam || null
    );
    const [favoriteTeamLogo, setFavoriteTeamLogo] = useState(
        JSON.parse(localStorage.getItem("loggedUser"))?.profile
            ?.favoriteTeamLogo || ""
    );
    const [isEditing, setIsEditing] = useState(
        JSON.parse(localStorage.getItem("loggedUser"))?.profile?.isEditing
            ? true
            : false
    );
    const [loggedInUser, setLoggedInUser] = useState(
        JSON.parse(localStorage.getItem("loggedUser"))
    );

    const [profilePic, setProfilePic] = useState(
        loggedInUser?.profilePic || ""
    );
    const [favoriteTeamMatches, setFavoriteTeamMatches] = useState([]);
    const [userFavoriteTeam, setUserFavoriteTeam] = useState("");
    const [filter, setFilter] = useState("all");
    const [filteredMatches, setFilteredMatches] = useState(favoriteTeamMatches);
    const [{ loggedUser, setLoggedUser, updateProfilePic }] =
        useProfileContext();
    const [tempProfilePic, setTempProfilePic] = useState("");
    const [uniqueMatches, setUniqueMatches] = useState([]);
    // const [seasonMatches, setSeasonMatches] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState("");
    const [seasonMatches, setSeasonMatches] = useState({});
    const currentDate = new Date().toISOString().split("T")[0];
    const [canEditImage, setCanEditImage] = useState(true);
    const [alertOpen, setAlertOpen] = useState(false);



    useEffect(() => {
        const userTeamName = loggedInUser?.team?.name;

        if (userTeamName) {
            setUserFavoriteTeam(userTeamName);

            const matches = JSON.parse(sessionStorage.getItem("myHistory"));

            if (matches) {
                const allRoundsFilteredMatches = matches.reduce(
                    (acc, round) => {
                        const filteredMatches = round.filter(
                            (match) =>
                                match.homeTeam === userTeamName ||
                                match.awayTeam === userTeamName
                        );
                        return [...acc, ...filteredMatches];
                    },
                    []
                );

                setFavoriteTeamMatches(allRoundsFilteredMatches);
            }
        }
    }, []);



    useEffect(() => {
        const uniqueMatchSet = new Set();
        const uniqueMatches = [];
        let season = 1; // Start from season 1
        const roundsPerSeason = 8; // Change this value to 16 or 24 depending on your requirement

        filteredMatches.forEach((match) => {
            const matchKey = `${match.homeTeam}-${match.homeGoals}-${match.awayGoals}-${match.awayTeam}`;
            if (!uniqueMatchSet.has(matchKey)) {
                uniqueMatchSet.add(matchKey);
                uniqueMatches.push(match);
            }
        });

        const seasonMatches = uniqueMatches.reduce((acc, match, index) => {
            if (index >= 0 && index % roundsPerSeason === 0 && index !== 0) {
                season++;
            }

            if (!acc[season]) {
                acc[season] = [];
            }

            const existingMatchIndex = acc[season].findIndex(
                (existingMatch) =>
                    existingMatch.homeTeam === match.homeTeam &&
                    existingMatch.awayTeam === match.awayTeam
            );

            if (existingMatchIndex === -1) {
                acc[season].push(match);
            }
            return acc;
        }, {});

        setSeasonMatches(seasonMatches);
    }, [filteredMatches]);



    useEffect(() => {
        const filterMatches = () => {
            const teamName = loggedInUser?.team?.name;
            switch (filter) {
                case 'wins':
                    setFilteredMatches(favoriteTeamMatches.filter(match =>
                        (match.homeTeam === teamName && match.homeGoals > match.awayGoals) ||
                        (match.awayTeam === teamName && match.awayGoals > match.homeGoals)
                    ));
                    break;
                case 'draws':
                    setFilteredMatches(favoriteTeamMatches.filter(match =>
                        (match.homeTeam === teamName || match.awayTeam === teamName) && match.homeGoals === match.awayGoals
                    ));
                    break;
                case 'losses':
                    setFilteredMatches(favoriteTeamMatches.filter(match =>
                        (match.homeTeam === teamName && match.homeGoals < match.awayGoals) ||
                        (match.awayTeam === teamName && match.awayGoals < match.homeGoals)
                    ));
                    break;
                default:
                    setFilteredMatches(favoriteTeamMatches);
            }
        };
        filterMatches();
    }, [filter, favoriteTeamMatches, loggedInUser]);


    const dispatch = useDispatch();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
                setTempProfilePic(e.target.result);

                // Updating the loggedInUser object
                const updatedLoggedInUser = {
                    ...loggedInUser,
                    profilePic: reader.result,
                };
                setLoggedInUser(updatedLoggedInUser);
                updateProfilePic(updatedLoggedInUser.profilePic);
                setLoggedUser(updatedLoggedInUser);

                // Saving the updatedLoggedInUser object in the local storage
                localStorage.setItem(
                    "loggedUser",
                    JSON.stringify(updatedLoggedInUser)
                );

                // Updating the "users" array in local storage
                const users = JSON.parse(localStorage.getItem("users")) || [];
                const updatedUsers = users.map((user) => {
                    if (user.username === loggedInUser.username) {
                        // Update the user with the profile picture
                        return updatedLoggedInUser;
                    }
                    return user;
                });
                localStorage.setItem("users", JSON.stringify(updatedUsers));
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const updateUserData = () => {
            setFirstName(loggedInUser?.profile?.firstName);
            setLastName(loggedInUser?.profile?.lastName);
            setDateOfBirth(loggedInUser?.profile?.dateOfBirth);
            setFavoriteTeam(loggedInUser?.profile?.favoriteTeam);
            setFavoriteTeamLogo(
                teams?.find(
                    (team) => team?.name === loggedInUser?.profile?.favoriteTeam
                )?.logo || ""
            );
            setIsEditing(loggedInUser?.profile?.isEditing);

            const isProfileComplete =
                loggedInUser?.profile?.firstName &&
                loggedInUser?.profile?.lastName &&
                loggedInUser?.profile?.dateOfBirth &&
                loggedInUser?.profile?.favoriteTeam &&
                loggedInUser?.profilePic;

            setIsEditing(!isProfileComplete);

            setLoggedInUser(loggedInUser);
            setLoggedUser(loggedInUser);
        };
        updateUserData();
    }, [profilePic]);

    const handleSave = () => {

        console.log(firstName, lastName, dateOfBirth, favoriteTeam );
        if (!firstName || !lastName || !dateOfBirth || !favoriteTeam) {
            setAlertOpen(true);
            return;
        }

        if (tempProfilePic) {
            setProfilePic(tempProfilePic);
            updateProfilePic(loggedInUser.username, tempProfilePic);
        }

        const updatedProfile = {
            firstName,
            lastName,
            dateOfBirth,
            favoriteTeam,
            favoriteTeamLogo,
            isEditing: false,
        };

        const updatedLoggedInUser = {
            ...loggedInUser,
            profile: updatedProfile,
        };

        setLoggedInUser(updatedLoggedInUser);
        setLoggedUser(updatedLoggedInUser);

        localStorage.setItem("loggedUser", JSON.stringify(updatedLoggedInUser));

        // Updating the "users" array in local storage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map((user) => {
            if (user.username === loggedInUser.username) {
                // Update the user with the profile picture
                return { ...updatedLoggedInUser, profilePic: profilePic };
            }
            return user;
        });
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setIsEditing(false);
        setCanEditImage(false);

    };

    const handleEdit = () => {
        setIsEditing(true);
        setCanEditImage(true);

        const updatedProfile = {
            firstName,
            lastName,
            dateOfBirth,
            favoriteTeam,
            favoriteTeamLogo,
            isEditing: true,
        };

        // Updating the loggedInUser object
        const updatedLoggedInUser = {
            ...loggedInUser,
            profile: updatedProfile,
        };
        setLoggedInUser(updatedLoggedInUser);
        setLoggedUser(updatedLoggedInUser);

        // Saving the updatedLoggedInUser object in the local storage
        localStorage.setItem("loggedUser", JSON.stringify(updatedLoggedInUser));
    };

    const handleTeamChange = (event) => {
        const team = teams.find((t) => t.name === event.target.value);
        setFavoriteTeam(team.name);
        setFavoriteTeamLogo(team.logo);
    };



    return (
        <Container className="profile-main-container">
            <Grid
                container
                spacing={3}
                sx={{ display: "flex", justifyContent: "center", position: "relative", zIndex: "0" }}
            >
                <Grid item xs={6} /* className="profile-card" */>
                    <Grid
                        container
                        spacing={3}
                        className="profile-card"
                        sx={{ width: "100%", minHeight: "700px" }}
                    >
                        <Grid item xs={12}>
                            <label
                                htmlFor="hiddenFileInput"
                                style={{ cursor: "pointer" }}
                            >
                                <Avatar
                                    alt="Profile"
                                    src={profilePic}
                                    sx={{ width: 150, height: 150 }}
                                    className="profilePic"
                                />
                                {canEditImage  && (
                                    <input
                                        type="file"
                                        id="hiddenFileInput"
                                        onChange={handleFileInputChange}
                                        style={{ display: "none" }}
                                    />
                                )}
                            </label>
                        </Grid >
                        {isEditing ? (
                            <>
                                <Grid item xs={12} sx={{ height: "300px" }}>
                                    <TextField
                                        label="First Name"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        fullWidth
                                        sx={{ marginBottom: "20px" }}

                                    />
                                    <TextField
                                        label="Last Name"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        fullWidth
                                        sx={{ marginBottom: "20px" }}
                                    />
                                    <TextField
                                        type="date"
                                        value={dateOfBirth}
                                        onChange={(e) => {
                                            const selectedDate = e.target.value;
                                            const today = new Date().toISOString().split("T")[0];
                                            if (selectedDate > today) {
                                                setDateOfBirth(today);
                                            } else {
                                                setDateOfBirth(selectedDate);
                                            }
                                        }}
                                        fullWidth
                                        sx={{ marginBottom: "20px" }}
                                        max={new Date().toISOString().split("T")[0]}
                                    />
                                    <FormControl
                                        fullWidth
                                        sx={{ marginBottom: "20px" }}
                                    >
                                        <InputLabel>Favorite Team</InputLabel>
                                        <Select
                                            label="Favorite Team"
                                            value={favoriteTeam}
                                            onChange={handleTeamChange}
                                        >
                                            <MenuItem value="">
                                                <em>Select...</em>
                                            </MenuItem>
                                            {teams.map((team) => (
                                                <MenuItem
                                                    key={team.name}
                                                    value={team.name}
                                                >
                                                    {team.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </Button>
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs={12} sx={{ height: "300px" }}>
                                    <h2>First-name: {firstName}</h2>
                                    <h2>Last-name: {lastName}</h2>
                                    <h2>Date-of-birth: {dateOfBirth}</h2>
                                    <h2> Favourite team: {favoriteTeam}</h2>
                                    <img
                                        src={favoriteTeamLogo}
                                        alt={favoriteTeam}
                                        width="100"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleEdit}
                                    >
                                        Edit
                                    </Button>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={6} className="profile-card">
                    <div
                        style={{
                            padding: "24px",
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                        }}
                    >
                        <FormControl fullWidth>
                            <InputLabel>Filter</InputLabel>
                            <Select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                label="Filter"
                            >
                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="wins">Wins</MenuItem>
                                <MenuItem value="draws">Draws</MenuItem>
                                <MenuItem value="losses">Losses</MenuItem>
                            </Select>
                        </FormControl>
                        <div
                            className="history-container"
                            style={{ maxHeight: "400px", overflowY: "auto" }}
                        >
                            <h3>Matches involving {userFavoriteTeam}:</h3>
                            {Object.keys(seasonMatches).length ? (
                                Object.keys(seasonMatches)
                                    .filter(
                                        (season) =>
                                            !selectedSeason ||
                                            season === selectedSeason
                                    )
                                    .map((season) => (
                                        <div key={season}>
                                            {/* <h3>Season {season}:</h3> */}
                                            <ul>
                                                {seasonMatches[season]
                                                    .filter((match) => {
                                                        if (filter === 'all') return true;
                                                        const isWin = (match.homeGoals > match.awayGoals && match.homeTeam === userFavoriteTeam) || (match.awayGoals > match.homeGoals && match.awayTeam === userFavoriteTeam);
                                                        const isDraw = match.homeGoals === match.awayGoals;
                                                        const isLoss = (match.homeGoals < match.awayGoals && match.homeTeam === userFavoriteTeam) || (match.awayGoals < match.homeGoals && match.awayTeam === userFavoriteTeam);
                                                        if (filter === 'wins' && isWin) return true;
                                                        if (filter === 'draws' && isDraw) return true;
                                                        if (filter === 'losses' && isLoss) return true;
                                                        return false;
                                                    })
                                                    .map((match, index) => (
                                                        <li
                                                            key={index}
                                                            className="history-matches"
                                                        >
                                                            {match.homeTeam}{" "}
                                                            {match.homeGoals} -{" "}
                                                            {match.awayGoals}{" "}
                                                            {match.awayTeam}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    ))
                            ) : (
                                <p>No matches found for {userFavoriteTeam}.</p>
                            )}
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={() => setAlertOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setAlertOpen(false)}
                    severity="warning"
                    sx={{ width: "100%" }}
                >
                    Please fill in all the fields.
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ProfilePage;
