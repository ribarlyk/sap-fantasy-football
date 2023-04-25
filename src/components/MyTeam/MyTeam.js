import "./MyTeam.scss";
import Pitch from "./Pitch/Pitch";
import { useState, useEffect } from "react";
import Loader from "./Loader/Loader";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MyTeam() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

        if (!loggedUser || !loggedUser.team) {
            setShowAlert(true);
        }
    }, []);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setShowAlert(false);
    };

    const timeoutIt = setTimeout(() => {
        setIsLoaded(true);
    }, 3000);

    return <>
        <Snackbar
                open={showAlert}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="warning">
                    You have to select your team first.
                </Alert>
            </Snackbar>
        <div className="team-container">{isLoaded ? <Pitch /> : <Loader />}</div>
    </>;
}
