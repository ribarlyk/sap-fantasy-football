import "./WinnerPodium.scss";
import { useEffect, useState } from "react";
export default function WinnerPodium({ leagueResults }) {
    const [badges, setBadges] = useState([]);
    console.log(leagueResults)
    let badgesa = leagueResults.map((team) => team?.team?.logo || team?.logo)
    // useEffect(() => {
    //     setBadges(() => ));
    // }, []);
    console.log(badgesa);
    return (
        <div className="podium-container">
            <div className="background-container">
                <div className="badges-top3-container">
                    <div className="nd-place-badge">
                        <img width="100px" height="100px" src={badgesa[1]} alt="logo" />
                    </div>
                    <div className="st-place-badge">
                    <img src={badgesa[0]} alt="logo" width="150px" height="150px"/>
                        
                    </div>
                    <div className="rd-place-badge">
                    <img src={badgesa[2]} alt="logo" width="100px" height="100px"/>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
