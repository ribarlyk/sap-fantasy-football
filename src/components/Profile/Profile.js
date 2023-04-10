import "./Profile.css";
import { motion } from "framer-motion"

export default function Profile() {
    return (
        <motion.div className="profile-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <h1>PROFILE PAGE</h1>
        </motion.div>
    );
}
