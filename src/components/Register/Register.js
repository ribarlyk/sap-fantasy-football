import "./Register.css";
import { motion } from "framer-motion"

export default function Register() {
    return (
        <motion.div className="register-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h1>Register</h1>
        </motion.div>
    );
}
