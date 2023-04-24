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
    const navigate = useNavigate();
    const [{ loggedUser, setLoggedUser, updateProfilePic }] =
        useProfileContext();
    const profilePicUrl = loggedUser?.profilePic;
    const [avatarSrc, setAvatar] = React.useState("");

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
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
        setIsSigned(loggedUser !== null);
        setLoggedUser(loggedUser);
    }, []);

    useEffect(() => {
        if (loggedUser) {
            setAvatar(profilePicUrl);
        } else {
            setAvatar("");
        }
    }, [loggedUser]);

    const handleLogout = () => {
        localStorage.removeItem("loggedUser");
        setIsSigned(false);
        setAvatar("");
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
                                    onClick={(e) => {}}
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
