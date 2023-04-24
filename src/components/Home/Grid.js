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
                        <Link
                            to="https://en.wikipedia.org/wiki/UEFA_Euro_2016_final"
                            target="blank"
                            className="card-text"
                        >
                            The UEFA Euro 2016 Final was the final match of Euro
                            2016, the fifteenth edition of the European Football
                            Championship, UEFA's quadrennial competition for
                            national football teams. The match was played at the
                            Stade de France in Paris, France, on 10 July 2016,
                            and was contested by Portugal and France. The
                            24-team tournament began with a group stage, from
                            which 16 teams qualified for the knockout phase. En
                            route to the final, Portugal finished third in Group
                            F, with draws against Iceland, Austria and Hungary.
                            Portugal then defeated Croatia in the last 16 before
                            beating Poland in the quarter-final after a penalty
                            shoot-out. They progressed to the final after
                            beating Wales in the semi-final. France finished the
                            group stage as winners of Group A, beating Romania
                            and Albania before drawing with Switzerland. In the
                            knockout rounds, France defeated the Republic of
                            Ireland and Iceland before beating Germany in the
                            semi-final.
                        </Link>
                    </Item>
                </Grid>

                <Grid xs={4}>
                    <Item className="item">
                        <img
                            className="introImg"
                            src="https://content.api.news/v3/images/bin/c39a58e6d51b051b8fc2fea931764a4e"
                        ></img>
                        <Link
                            to="https://www.90min.com/posts/how-liverpool-won-the-2019-uefa-champions-league"
                            target="blank"
                            className="card-text"
                        >
                            Three goals down to a Barcelona team who had the
                            greatest footballer of all time on their books
                            (Lionel Messi, if you're wondering), Klopp's men
                            needed a miracle to make it through to the final.
                            And they got it. Two goals from Georginio Wijnaldum
                            and two from Divock Origi completed a remarkable
                            comeback to send Anfield into raptures, and
                            Liverpool through to the Champions League final.
                            After suffering final heartbreak at the hands of
                            Real Madrid the year before, Klopp's men finally got
                            their hands on the 'trophy with the big ears' on 1st
                            June 2019. Any pre-match nerves were quickly
                            relieved as, inside the first two minutes, Mohamed
                            Salah converted a spot kick. The game was then put
                            to bed in the 87th minute by a lovely goal from
                            Origi.It's certainly right up there with Liverpool's
                            Istanbul triumph.
                        </Link>
                    </Item>
                </Grid>
                <Grid xs={4}>
                    <Item className="item">
                        <img
                            className="introImg"
                            src="https://media.cnn.com/api/v1/images/stellar/prod/221221005245-01-messi-world-cup-celebration-121822-restricted.jpg?c=16x9&q=h_720,w_1280,c_fill"
                        ></img>
                        <Link
                            to="https://www.vogue.com/article/argentina-wins-2022-world-cup-defeating-france"
                            target="blank"
                            className="card-text"
                        >
                            Argentina has won the 2022 World Cup in Lusail,
                            Qatar, defeating France with a 3-3 (4-2 penalty)
                            final score after a nail-bitting match that
                            concluded in a penalty shootout. The first half of
                            the match saw Argentina claim a 2-0 lead thanks to
                            goals from Angel Di Maria and the legendary Lionel
                            Messi, who played his final World Cup today. With a
                            penalty kick 23 minutes in, Messi became the first
                            man in FIFA World Cup history to score in all five
                            rounds at a single tournament. Progressing into the
                            second half, Argentina looked to secure their lead
                            by slowing down their play—but France soon rallied
                            to a tie with two consecutive goals from Kylian
                            Mbappé, the team's 23-year-old star player.Mbappé
                            impressively earned both points within two minutes
                            of each other, causing French fans—among effusive
                            Macron wild.
                        </Link>
                    </Item>
                </Grid>
                <Grid xs={4}>
                    <Item className="item">
                        <img
                            className="introImg"
                            src="https://www.gol.bg/media/files/resized/article/625x352/15a/df3132795486f15a-e329487b2f5ca63a.jpeg"
                        ></img>
                        <Link
                            target="blank"
                            className="card-text"
                            to="https://topsport.bg/levski/53-godini-ot-levski-tsska-7-2.html"
                        >
                            The hostility reached its climax on 19 June 1985
                            during the Bulgarian Cup final held at Vasil Levski
                            National Stadium when, after many disputable referee
                            decisions, both teams demonstrated poor
                            sportsmanship which resulted in regular fights
                            between them on the pitch. On 21 June, the Central
                            Committee of the Bulgarian Communist Party issued a
                            decree that disbanded both teams. CSKA Septemvriysko
                            zname had to be re-founded as Sredets and
                            Levski-Spartak as Vitosha. Six players (including
                            Hristo Stoichkov and Borislav Mihaylov) were banned
                            for life from playing competitive football; many
                            other players and staff members were banned for
                            three months to one year. A year later, the decision
                            was abolished and the players continued their sport
                            careers. ГУНДИ бележи за крайното 7:2 за Левски.
                        </Link>
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
