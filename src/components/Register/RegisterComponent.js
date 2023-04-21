import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useUserManager from '../Models/LoginAndRegisterModel/UserManager';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUpSide() {
    const userManager = useUserManager();
    const navigate = useNavigate();
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const isButtonDisabled = !username || !password || !confirmPassword;

    const handleUsernameChange = (event) => {
        setUsername(event.target.value.trim());
        if (event.target.value.length < 6) {
            setUsernameError('Username must be at least 6 characters');
            setUsernameValid(false);
        } else {
            setUsernameError('');
            setUsernameValid(true);
        }
    };


    const handlePasswordChange = (event) => {
        const trimmedPassword = event.target.value.trim();
        setPassword(trimmedPassword.trim());
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s_])[A-Za-z\d\W_]{8,}$/;
        if (!regex.test(trimmedPassword)) {
            setPasswordError('Password must contain 1 uppercase, 1 lowercase, 1 digit, and 1 special character');
            setPasswordValid(false);
        } else {
            setPasswordError('');
            setPasswordValid(true);
        }
    };
    


    const handleSubmit = (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            userManager
                .register({ username, password })
                .then((newUser) => {
                    console.log("User registered successfully:", newUser);
                    setSuccessMessage('You have registered successfully');
                    setTimeout(() => {
                        // Redirect to the login page
                        navigate('/login');
                    }, 3000);
                })
                .catch((error) => {
                    setErrorMessage("Registration error: " + error);
                });
        } else {
            setErrorMessage("Passwords do not match");
        }
    };


    const handleShowPasswordChange = (event) => {
        setShowPassword(event.target.checked);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '65vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://www.fifplay.com/img/public/football-manager-2024.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 0, bgcolor: 'primary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 1, height: "100%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={handleUsernameChange}
                                sx={{ minHeight: "90px" }}
                                helperText={username.length > 0 ? (usernameError || (usernameValid && 'Username is valid')) : ''}
                                error={!usernameValid && username.length > 0}
                            />
                            {/* {username.length > 0 &&
                                (<Typography variant="caption" color={usernameValid ? "success.main" : "error"} display="block">
                                    {usernameError || (usernameValid && 'Username is valid')}
                                </Typography>)} */}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={handlePasswordChange}
                                sx={{ minHeight: "90px", marginTop: "0" }}
                                helperText={password.length > 0 ? (passwordError || (passwordValid && 'Password is valid')) : ''}
                                error={!passwordValid && password.length > 0}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type={showPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                sx={{ minHeight: "90px", marginTop: "0", marginBottom: "0"}}
                            />
                            <Grid container justifyContent="flex-start">
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
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={isButtonDisabled}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link component={RouterLink} to="/login" variant="body2">
                                        {"Already have an account"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar
                open={!!errorMessage}
                autoHideDuration={1000}
                onClose={() => setErrorMessage('')}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setErrorMessage('')} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={!!successMessage}
                autoHideDuration={1000}
                onClose={() => setSuccessMessage('')}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>

        </ThemeProvider >
    );
}