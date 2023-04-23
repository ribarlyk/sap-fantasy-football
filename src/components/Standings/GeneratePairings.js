import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import Pair from "./Pair";

function GeneratePairings({ teams }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedUser')));
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
        // const awayMatches = roundPairings.map((pairing) => [
        //     pairing[1],
        //     pairing[0],                                                  //LOGIC FOR HOME AWAY PLAYING
        // ]);

        // Add the round pairings to the pairings object
        pairings.push(homeMatches)
            // .concat(awayMatches.reverse()));
    }
    console.log(pairings[1])
    // set number of items per page
    const itemsPerPage = 1;

    // set initial page number to 1
    const [currentPage, setCurrentPage] = useState(1);

    // calculate total number of pages
    const totalPages = Math.ceil(pairings.length / itemsPerPage);

    // calculate index of first and last item to display on current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // slice the pairings array to get the pairings for current page
    const currentPairings = pairings.slice(indexOfFirstItem, indexOfLastItem);
    // localStorage.setItem("fixtures", JSON.stringify(pairings));
    useEffect(() => {
        const updatedUser = { ...user, fixtures: pairings };
        // setUser(updatedUser);


        // Save the updated user object to localStorage
        localStorage.setItem("loggedUser", JSON.stringify(updatedUser));

        return () => {

        }
    },[user, pairings]) 
  
    return (
        <div className="pairs-container">
            {/* render pagination */}
            <div className="pagination">
                <h2>
                    Round {currentPage} of {totalPages}
                </h2>
                <ul>
                    {/* render pairings for current page */}
                    {currentPairings.map((round, i) => (
                        <React.Fragment key={uniqid()}>
                            {/* <h2>
                            Round {i + 1 + (currentPage - 1) * itemsPerPage}
                        </h2> */}
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

