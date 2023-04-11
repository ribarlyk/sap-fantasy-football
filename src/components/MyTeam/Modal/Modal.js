import "../Pitch/Pitch.scss";
import "./Modal.scss";
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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

export default function BasicModal({ name, onPlayerChangeHandler }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const switchPlayerHandler = () => {
        console.log(name);
        setOpen(false);
        onPlayerChangeHandler(true, name);
    };

    return (
        <>
            <Button size={"large"} onClick={handleOpen}>
                <img
                    className="change-icon"
                    width="30"
                    height="30"
                    position="absolute"
                    src="assets\swapplayers.png"
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
                            <button className="info-button">PLAYER INFO</button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </>
    );
}
