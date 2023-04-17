import { useState } from "react";
import uniqid from "uniqid";

export default function Pair( {round} ) {
    const pairs = round.map(
        (x) =>
            `${x[0].teamName || x[0].team.name} vs ${
                x[1].teamName || x[1].team.name
            }`
    );

    const pages = [];
    for (let i = 0; i < pairs.length; i += 5) {
        pages.push({ round: i / 5 + 1, pairs: pairs.slice(i, i + 5) });
    }

    return (
        <>
            {pages.map((page, i) => (
                <div key = {uniqid()}>
                    <h2>Leg {i+1}</h2>
                    <ul>
                        {page.pairs.map((pair) => (
                            <li key={uniqid()}>{pair}</li>
                        ))}
                    </ul>
                    <div className="page-break"></div>
                </div>
            ))}
        </>
    );
}
