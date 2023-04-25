import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useUseUserManager from "../Models/LoginAndRegisterModel/UserManager";
import { useUserContext } from "../LiftingStates/UserContext";
import { useProfileContext } from "../LiftingStates/ProfileContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

export default function SignInSide() {
    const userManager = useUseUserManager();
    const navigate = useNavigate();
    const [isSigned, setIsSigned] = useUserContext();
    const [{ loggedUser, setLoggedUser, updateProfilePic }] =
        useProfileContext();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const isButtonDisabled = !username || !password;

    const handleSubmit = (event) => {
        event.preventDefault();
        userManager
            .login({ username, password })
            .then((user) => {
                setIsSigned(true);
                setSnackbarSeverity("success");
                setSnackbarMessage("Logged in successfully!");
                setSnackbarOpen(true);
                window.scrollTo({
                    top: 0
                })

                setTimeout(() => {
                    navigate("/profile");
                }, 1500);
            })
            .catch((error) => {
                setSnackbarSeverity("error");
                setSnackbarMessage("Wrong username or password");
                setSnackbarOpen(true);
            });
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value.trim());
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value.trim());
    };

    const handleShowPasswordChange = (event) => {
        setShowPassword(event.target.checked);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "65vh", width: "75%", margin: "0 auto" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={3}
                    md={7}
                    sx={{
                        backgroundImage:
                            "url(https://www.fifplay.com/img/public/football-manager-2024.jpg)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 0, bgcolor: "primary.main" }} src="https://aux.iconspalace.com/uploads/football-icon-256-1281892144.png">
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="Username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={handleUsernameChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={showPassword}
                                        onChange={handleShowPasswordChange}
                                        color="primary"
                                    />
                                }
                                label="Show password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={isButtonDisabled}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link
                                        component={RouterLink}
                                        to="/register"
                                        variant="body2"
                                    >
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={1000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}
