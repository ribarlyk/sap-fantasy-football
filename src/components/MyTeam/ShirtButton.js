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
            console.log(localStorageTeam)
            let newTeamList = localStorageTeam.slice() || localStorageTeam.team.slice()  

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
            let team = JSON.parse(localStorage.getItem("loggedUser"));
            team.team = newTeamList;
            console.log(team)
            localStorage.setItem("loggedUser", JSON.stringify(team));
            setIsChange(!isChange);
        } else {
            return
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
            <div className="player-name-container">{name}</div>
            <div className="player-position-container">{position}</div>
        </button>
    );
}
