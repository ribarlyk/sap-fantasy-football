import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import Pair from "./Pair";

function GeneratePairings({ teams }) {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("loggedUser"))
    );
    const pairings = [];
    const rounds = 9;

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

        const homeMatches = roundPairings.map((pairing) => [
            pairing[0],
            pairing[1],
        ]);
        pairings.push(homeMatches);
    }
    const itemsPerPage = 1;

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(pairings.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentPairings = pairings.slice(indexOfFirstItem, indexOfLastItem);
    useEffect(() => {
        const updatedUser = { ...user, fixtures: pairings };

        localStorage.setItem("loggedUser", JSON.stringify(updatedUser));

        return () => {};
    }, [user, pairings]);

    return (
        <div className="pairs-container">
            <div className="pagination">
                <h2>
                    Round {currentPage} of {totalPages}
                </h2>
                <ul>
                    {currentPairings.map((round, i) => (
                        <React.Fragment key={uniqid()}>
                            <Pair round={round.map((round) => round)}></Pair>
                        </React.Fragment>
                    ))}
                </ul>
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default GeneratePairings;
