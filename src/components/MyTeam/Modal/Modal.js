import "../Pitch/Pitch.scss";
import "./Modal.scss";
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import swapPlayersImage from "../../../assets/images/jerseys/swapplayers.png";
import ChartComponent from "../Chart/Chart";
const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 150,
    bgcolor: "#ffffff",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 20,
};
const styleTwo = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 250,
    bgcolor: "#ffffff",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 20,
};

export default function BasicModal({
    name,
    onPlayerChangeHandler,
    playerStats,
    stats,
}) {
    const [open, setOpen] = useState(false);
    const [openChildModal, setOpenChildModal] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const switchPlayerHandler = () => {
        console.log(stats);
        console.log(playerStats);
        setOpen(false);
        onPlayerChangeHandler(true, name);
    };

    const handleOpenChildModal = () => setOpenChildModal(true);
    const handleCloseChildModal = () => setOpenChildModal(false);

    return (
        <>
            <Button size={"large"} onClick={handleOpen}>
                <img
                    className="change-icon"
                    width="30"
                    height="30"
                    position="absolute"
                    src={swapPlayersImage}
                />
            </Button>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                        ></Typography>

                        <div className="modal-buttons">
                            <p className="modal-name">{name}</p>
                            <button
                                onClick={switchPlayerHandler}
                                className="switch-button"
                            >
                                SWITCH PLAYER
                            </button>
                            <button
                                onClick={handleOpenChildModal}
                                className="info-button"
                            >
                                PLAYER INFO
                            </button>
                        </div>
                    </Box>
                </Modal>

                <Modal
                    open={openChildModal}
                    onClose={handleCloseChildModal}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={styleTwo}>
                        <Typography
                            id="child-modal-title"
                            variant="h6"
                            component="h2"
                        ></Typography>
                        <div className="modal-buttons child-modal-btn">
                            <h2>
                                {playerStats.firstname} {playerStats.lastname}
                            </h2>
                            <div className="container-modal">
                                <div className="left-wrapper">
                                    <img
                                        width="100"
                                        height="100"
                                        src={playerStats.photo}
                                        alt="player-photo"
                                    ></img>
                                    <div class="left-column-modal">
                                        <div>Age: {playerStats.age}</div>
                                        <div>
                                            Nationality:{" "}
                                            {playerStats.nationality}
                                        </div>
                                        <div>
                                            Height: {playerStats.height || 180}
                                        </div>
                                    </div>
                                </div>

                                <div class="right-column-modal">
                                    {/* <div>Agression: {stats.agression}</div>
                                    <div>Attack: {stats.attack}</div>
                                    <div>Defense: {stats.defense}</div>
                                    <div>Pace: {stats.pace}</div>
                                    <div>Speed: {stats.speed}</div> */}
                                    <ChartComponent stats={stats} />
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </>
    );
}
