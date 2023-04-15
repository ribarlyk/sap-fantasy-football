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
import avatar from "../../assets/images/avatar.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../LiftingStates/UserContext";
import { useEffect } from "react";

function ResponsiveAppBar() {
    const [isSigned, setIsSigned] = useUserContext();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate(); //TODO Проверка дали има юзър за да смени вюто на навигацията
    // const [isSigned, setIsSigned] = React.useState(false);
    // isSigned = false;
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
        const user = localStorage.getItem("loggedUser");
        setIsSigned(user !== null);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("loggedUser");
        setIsSigned(false);
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

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar alt="Remy Sharp" src={avatar} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem
                                    key="Profile"
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography
                                        textAlign="center"
                                        onClick={(e) => {
                                            console.log("Profile");
                                        }}
                                    >
                                        <Link
                                            to="/profile"
                                            style={{
                                                color: "black",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Profile
                                        </Link>
                                    </Typography>
                                </MenuItem>
                                <MenuItem key="Logout" onClick={handleLogout}>
                                    <Typography
                                        textAlign="center"
                                        onClick={(e) => {
                                            console.log("logout");
                                        }}
                                    >
                                        Logout
                                    </Typography>
                                </MenuItem>
                            </Menu>
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
                            </Button>
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

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar alt="Remy Sharp" src={avatar} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem
                                    key="Login"
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography
                                        textAlign="center"
                                        onClick={(e) => {
                                            console.log("login");
                                        }}
                                    >
                                        <Link
                                            to="/login"
                                            style={{
                                                color: "black",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Sign In
                                        </Link>
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    key="register"
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography
                                        textAlign="center"
                                        onClick={(e) => {
                                            console.log("register");
                                        }}
                                    >
                                        <Link
                                            to="/register"
                                            style={{
                                                color: "black",
                                                textDecoration: "none",
                                            }}
                                        >
                                            Sign Up
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            </Menu>
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
