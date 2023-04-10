import "./News.css";
import { motion } from "framer-motion"

export default function News() {
    return (
        <motion.div className="news-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <h1>NEWS</h1>
        </motion.div>
    );
}
