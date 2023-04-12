import "./Home.scss";
import { motion } from "framer-motion";
import BasicGrid from "./Grid";

export default function Home() {
    return (
        <motion.div
            className="home-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <BasicGrid />
        </motion.div>
    );
}
