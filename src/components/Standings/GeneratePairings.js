import { useState } from "react";
import Pair from "./Pair";
import uniqid from "uniqid";


export default function GeneratePairings({teams}) {
    const pairings = {};
    const rounds = teams.length - 1;

    for (let round = 0; round < rounds; round++) {
        const roundPairings = [];

        for (let i = 0, j = teams.length - 1; i < j; i++, j--) {
            const home = teams[i];
            const away = teams[j];
            const pairing = [home, away];

            if (round % 2 === 1) {
                pairing.reverse();
            }

            roundPairings.push(pairing);
        }

        teams.splice(1, 0, teams.pop());

        pairings[`Round ${round + 1}`] = roundPairings;
    }

    return (
        <div className="pairs-container">
            <ul>
                {Object.keys(pairings).map((round) => {
                    return <Pair key={uniqid()} round={pairings[round].map(round=>round)}></Pair>
                })}
            </ul>
        </div>
    );
}