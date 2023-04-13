import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import "./Home.scss";
import ScorebatEmbed from "./WidgetApi";
import LiveScoreEmbed from "./LifescoreWidget";
import Header from "./Headers";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export default function BasicGrid() {
    return (
        <Box
            sx={{
                flexGrow: 1,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Grid container spacing={1}>
                <Grid xs={12}>
                    <Item className="item">
                        <img
                            className="introImg"
                            src="https://img.olympicchannel.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/primary/ydk9vatpnihwfquy6zq3"
                        ></img>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                        </p>
                    </Item>
                </Grid>

                <Grid xs={4}>
                    <Item className="item">
                        <img
                            className="introImg"
                            src="https://static.bnr.bg/gallery/cr/cc732a63aede78677d483cffedab513b.jpg"
                        ></img>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                        </p>
                    </Item>
                </Grid>
                <Grid xs={4}>
                    <Item className="item">
                        <img
                            className="introImg"
                            src="https://static.bnr.bg/gallery/cr/cc732a63aede78677d483cffedab513b.jpg"
                        ></img>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                        </p>
                    </Item>
                </Grid>
                <Grid xs={4}>
                    <Item className="item">
                        <img
                            className="introImg"
                            src="https://static.bnr.bg/gallery/cr/cc732a63aede78677d483cffedab513b.jpg"
                        ></img>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                        </p>
                    </Item>
                </Grid>
                <Grid xs={6}>
                    <Header title="Video" />
                    <Item className="item">
                        <ScorebatEmbed />
                    </Item>
                </Grid>
                <Grid xs={6}>
                    <Header title="Lifescores,fixtures and more..." />

                    <Item className="item">
                        <LiveScoreEmbed />
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
