import "./Standings.scss";
import { motion } from "framer-motion"

export default function Standings() {
    return (
        <motion.div className="standings-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <h1>STANDINGS TABLE</h1>
        </motion.div>
    );
}
