import "./MyTeam.scss";
import { motion } from "framer-motion";
import Pitch from "./Pitch/Pitch";
import { useState } from "react";
import Loader from "./Loader/Loader";

export default function MyTeam() {
    const [isLoaded, setIsLoaded] = useState(false);

    const timeoutIt = setTimeout(() => {
        setIsLoaded(true);
    }, 3000);

    return (
        <motion.div
            className="team-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {isLoaded ? <Pitch /> : <Loader />}
        </motion.div>
    );
}
