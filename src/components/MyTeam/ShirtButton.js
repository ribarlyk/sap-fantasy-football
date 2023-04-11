export default function ShirtButton({
    name,
    jersey,
    position,
    localStorageTeam,
    onPlayerChangeHandler,
    isChange,
    setIsChange,
}) {
    const onPlayerClickHandler = (e) => {
        console.log("klik");
        if (onPlayerChangeHandler()) {
            const playerIn = onPlayerChangeHandler();
            const playerOut = e.target.nextElementSibling.textContent;

            let newTeamList = localStorageTeam.slice();

            let playerTakenInIndex;
            let playerTakenOutIndex;

            newTeamList.forEach((player, index) => {
                if (player.player.name === playerOut) {
                    playerTakenInIndex = index;
                }
                if (player.player.name === playerIn) {
                    playerTakenOutIndex = index;
                }
            });

            let swapIn = newTeamList[playerTakenInIndex];
            newTeamList[playerTakenInIndex] = newTeamList[playerTakenOutIndex];
            newTeamList[playerTakenOutIndex] = swapIn;

            localStorage.setItem("team", JSON.stringify(newTeamList));
            setIsChange(!isChange);
        } else {
            return;
        }
    };
    return (
        <button className="goalkeeer-card" onClick={onPlayerClickHandler}>
            {jersey && (
                <img
                    className="card-jersey"
                    width="100"
                    height="100"
                    src={jersey}
                    alt=""
                />
            )}
            ;<div className="player-name-container">{name}</div>;
            <div className="player-position-container">{position}</div>;
        </button>
    );
}
