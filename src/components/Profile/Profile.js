import "./Profile.scss";
import { motion } from "framer-motion"
import ProfilePage from "../Profile/ProfileComponent";

export default function Profile() {
    return (
        <motion.div className="profile-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
             <ProfilePage />
        </motion.div>
    );
}
