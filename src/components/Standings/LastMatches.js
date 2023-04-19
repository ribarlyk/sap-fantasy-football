export default function LastMatches({ results }) {
    console.log(results);

    return (
        <>
            <h1>Last Matches</h1>
            {results.length>0 && (
                <div>
                    {results[1].map((x) => (
                        <div>
                            {x.awayTeam} {x.awayGoals} - {x.homeGoals}{" "}
                            {x.homeTeam}
                        </div>
                    ))}
                    <div>
                        {" "}
                        {results[0][0]}
                        {results[0][2]} - {results[0][1]}
                        {results[0][3]}
                    </div>
                </div>
            )}
        </>
    );
}
