import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function Animations() {
    return (
        <Box sx={{ width: 300 }}>
            <Skeleton animation="wave" sx={{ fontSize: "3rem" }} />
            <Skeleton animation="wave" sx={{ fontSize: "3rem" }} />
            <Skeleton animation="wave" sx={{ fontSize: "3rem" }} />
        </Box>
    );
}
