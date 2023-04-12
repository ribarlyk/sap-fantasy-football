import "./Login.scss";
import { motion } from "framer-motion";
import  SignInSide  from "../Login/LoginComponent";

export default function Login() {
    return (
        <motion.div className="login-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <SignInSide/>
        </motion.div>
    );
}
