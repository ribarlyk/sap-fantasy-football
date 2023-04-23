
import uniqid from "uniqid";

export default function Pair({ round }) {
    const pairs = round.map((x) => {
        const team1Name = x[0]?.teamName || x[0]?.team?.name || x[0]?.name ;
        const team2Name = x[1]?.teamName || x[1]?.team?.name || x[1]?.name;
        return `${team1Name} vs ${team2Name}`;
    });

    const pages = [];
    for (let i = 0; i < pairs.length; i += 5) {
        pages.push({ round: i / 5 + 1, pairs: pairs.slice(i, i + 5) });
    }

    return (
        <>
            {pages.map((page, i) => (
                <div key={uniqid()}>
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
