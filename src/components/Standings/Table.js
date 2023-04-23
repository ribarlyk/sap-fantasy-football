import "./Standings.scss";

export default function Table({ league, leagueResults }) {
    console.log(leagueResults);
    return (
        <table className="table-table">
            <thead >
                <tr className="header-table-row">
                    <th className="header-table-row">Place</th>
                    <th className="header-table-row">Badge</th>
                    <th className="header-table-row">TEAM</th>
                    <th className="header-table-row">Wins</th>
                    <th className="header-table-row">Draws</th>
                    <th className="header-table-row">Losses</th>
                    <th className="header-table-row">Scored</th>
                    <th className="header-table-row">Conceeded</th>
                    <th className="header-table-row">Points</th>
                </tr>
            </thead>
            <tbody>
                {(leagueResults.length > 0 ? leagueResults : league)
                    .sort((a, b) => ((b?.team?.points || 0) || (b?.points || 0)) - ((a?.team?.points || 0) || (a?.points || 0)))
                    .map((x, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    {x?.team?.logo || x?.logo? (
                                        <img
                                            src={x?.team?.logo || x?.logo }
                                            alt='logo' 
                                            width="35"
                                            height="35"
                                        />
                                    ) : null}
                                    {console.log(x.logo)}
                                </td>
                                <td className="team-name-table">{x?.team?.name || x?.name}</td>
                                <td>{x?.team?.wins || x?.wins || 0}</td>
                                <td>{x?.team?.draws || x?.draws || 0}</td>
                                <td>{x?.team?.loses || x?.loses || 0}</td>
                                <td>{x?.team?.scoredgoals || x?.scoredgoals || 0}</td>
                                <td>{x?.team?.conceededgoals || x?.conceededgoals || 0}</td>
                                <td className="team-name-table">{x?.team?.points || x?.points || 0}</td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
}
