import "./Register.scss";
import { motion } from "framer-motion"
import SignUpSide from "./RegisterComponent";

export default function Register() {
    return (
        // <motion.div className="register-container"
        //     initial={{ opacity: 0 }}
        //     animate={{ opacity: 1 }}
        //     exit={{ opacity: 0 }}
        // >
        // </motion.div>
            <SignUpSide/>
    );
}
