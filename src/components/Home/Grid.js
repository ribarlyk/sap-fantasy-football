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
import { useProfileContext } from "../LiftingStates/ProfileContext";
import { useEffect } from "react";

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
                            src="https://content.api.news/v3/images/bin/c39a58e6d51b051b8fc2fea931764a4e"
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
                            src="https://media.cnn.com/api/v1/images/stellar/prod/221221005245-01-messi-world-cup-celebration-121822-restricted.jpg?c=16x9&q=h_720,w_1280,c_fill"
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
                            src="https://trud.bg/public/images/articles/2022-05/ce702cc0cffc31148b74cc47c4c87a2f_1280x853_5529045805076222814_original.jpg"
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
                    <Header title="Livescores,fixtures and more..." />

                    <Item className="item">
                        <LiveScoreEmbed />
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
}
