import "./MyTeam.css";
import { motion } from 'framer-motion'

export default function MyTeam() {
    return (
        <motion.div 
        className="team-container"
        initial={{opacity : 0}}
        animate={{opacity : 1}}
        exit= {{opacity : 0}}
        >
            <h1>MY TEAM PAGE</h1>
        </motion.div>
    );
}
