import "./Match.css";
import { motion } from "framer-motion"
export default function Match() {
    return (
        <motion.div className="match-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h1>MATCH DAY</h1>
        </motion.div>
    );
}
