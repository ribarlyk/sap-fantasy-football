import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../LiftingStates/UserContext";
import { useProfileContext } from "../LiftingStates/ProfileContext";
import { useEffect } from "react";
import "./Navigation.scss";

function ResponsiveAppBar() {
    const [isSigned, setIsSigned] = useUserContext();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate(); //TODO Проверка дали има юзър за да смени вюто на навигацията
    // const [isSigned, setIsSigned] = React.useState(false);
    // isSigned = false;
    const [{ loggedUser, setLoggedUser, updateProfilePic }] = useProfileContext();
    const profilePicUrl = loggedUser?.profilePic;
    const [avatarSrc, setAvatar] = React.useState("");
    // const [loggedUser, setLoggedUser] = React.useState(null);



    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
        console.log("asd");
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("loggedUser"));
        setIsSigned(user !== null);
        console.log(user);
        // updateProfilePic(user?.profilePic)
        setLoggedUser(user);
    }, []);

    useEffect(() => {

        if (loggedUser) {
            setAvatar(profilePicUrl);
        } else {
            setAvatar("");
        }
    }, [loggedUser]);


    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem("loggedUser"));
    //     setAvatar(loggedUser?.profilePic);
    // }, [loggedUser]);


    const handleLogout = () => {
        localStorage.removeItem("loggedUser");
        setIsSigned(false);
        setAvatar('');
        handleCloseUserMenu();
        navigate("/");
    };

    const userNavigation = (
        <Container
            maxWidth={false}
            disableGutters
            sx={{ width: "calc(80vw + 2rem)" }}
        >
            <AppBar position="static">
                <Container maxWidth={false}>
                    <Toolbar disableGutters>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            <Button
                                key="My Team"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                <Link
                                    to="/my-team"
                                    style={{
                                        color: "white",
                                        textDecoration: "none",
                                    }}
                                >
                                    My Team
                                </Link>
                            </Button>
                            <Button
                                key="Table"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                <Link
                                    to="/standings"
                                    style={{
                                        color: "white",
                                        textDecoration: "none",
                                    }}
                                >
                                    Standings
                                </Link>
                            </Button>
                            <Button
                                key="Match Day"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                <Link
                                    to="/match-day"
                                    style={{
                                        color: "white",
                                        textDecoration: "none",
                                    }}
                                >
                                    Match Day
                                </Link>
                            </Button>
                        </Box>

                        <Box
                            className="logout-profile-btns"
                            sx={{ flexGrow: 0 }}
                        >
                            {isSigned && (
                                <Avatar
                                    alt="Profile"
                                    src={avatarSrc}
                                    sx={{ marginRight: "8px" }}
                                />
                            )}
                            <Button
                                key="Profile"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                <Link
                                    to="/profile"
                                    style={{
                                        color: "white",
                                        textDecoration: "none",
                                    }}
                                >
                                    Profile
                                </Link>
                            </Button>

                            <Button
                                key="Logout"
                                onClick={handleLogout}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                <Link
                                    to="/"
                                    style={{
                                        color: "white",
                                        textDecoration: "none",
                                    }}
                                    textAlign="center"
                                    onClick={(e) => {
                                        console.log("logout");
                                    }}
                                >
                                    Logout
                                </Link>
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Container>
    );
    const guestNavigation = (
        <Container
            maxWidth={false}
            disableGutters
            sx={{ width: "calc(80vw + 2rem)" }}
        >
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            {/* <Button
                                key="My Team"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                <Link
                                    to="/news"
                                    style={{
                                        color: "white",
                                        textDecoration: "none",
                                    }}
                                >
                                    News
                                </Link>
                            </Button> */}
                            <Button
                                key="Table"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                <Link
                                    to="/rules"
                                    style={{
                                        color: "white",
                                        textDecoration: "none",
                                    }}
                                >
                                    Rules
                                </Link>
                            </Button>
                        </Box>

                        <Box
                            className="login-register-btns"
                            sx={{ flexGrow: 0 }}
                        >
                            <Button
                                key="Login"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                <Link
                                    to="/login"
                                    style={{
                                        color: "white",
                                        textDecoration: "none",
                                    }}
                                >
                                    Login
                                </Link>
                            </Button>

                            <Button
                                key="register"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                <Link
                                    to="/register"
                                    style={{
                                        color: "white",
                                        textDecoration: "none",
                                    }}
                                >
                                    Register
                                </Link>
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Container>
    );

    return (
        <div className="nav-bar-container">
            {" "}
            {isSigned ? userNavigation : guestNavigation}{" "}
        </div>
    );
}

export default ResponsiveAppBar;
