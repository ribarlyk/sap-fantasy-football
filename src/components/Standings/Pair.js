import { useState } from "react";

export default function Pair({ round }) {
    const [rounds, setRounds] = useState(1);
    console.log(round);

    const nextRoundFixturesHandler = () => {
        setRounds((prev) => prev + 1);
    };


    function getRounds(){
        
    }
    return (
        <>
            <button onClick={nextRoundFixturesHandler}></button>
            <h2>Round {rounds}</h2>
            <li>
                {round

                    .map((x, i) => {
                        console.log(`Round ${i + 1}`);
                        console.log(
                            `${x[0].teamName || x[0].team.name} vs ${
                                x[1].teamName || x[1].team.name
                            }`
                        );
                        return `
                ${x[0].teamName || x[0].team.name} vs ${
                            x[1].teamName || x[1].team.name
                        }`;
                    })
                    .map((x) => (
                        <li>{x}</li>
                    ))}
            </li>
        </>
    );
}
