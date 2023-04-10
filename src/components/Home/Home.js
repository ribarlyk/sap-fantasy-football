import "./Home.css";
import { motion } from "framer-motion"

export default function Home() {
    return (
        <motion.div className="home-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h1>HOME PAGE</h1>
        </motion.div>
    );
}
