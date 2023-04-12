import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as utils from "../../utils/utils"

export default function SearchBar({ searchBarHandler,input }) {
    return (
        <Box
            component="form"
            sx={{
                "& > :not(style)": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
            value={input}
            onChange={utils.debouncer(searchBarHandler,500)}
        >
            <TextField
                id="standard-basic"
                label="Search Player Name"
                variant="standard"
            />
        </Box>
    );
}
