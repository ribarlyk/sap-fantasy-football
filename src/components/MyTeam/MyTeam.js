import "./MyTeam.scss";
import Pitch from "./Pitch/Pitch";
import { useState } from "react";
import Loader from "./Loader/Loader";

export default function MyTeam() {
    const [isLoaded, setIsLoaded] = useState(false);

    const timeoutIt = setTimeout(() => {
        setIsLoaded(true);
    }, 3000);

    return <div className="team-container">{isLoaded ? <Pitch /> : <Loader />}</div>;
}
