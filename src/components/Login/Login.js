import "./Login.scss";
import { motion } from "framer-motion"

export default function Login() {
    return (
        <motion.div className="login-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <h1>LOGIN</h1>
        </motion.div>
    );
}
