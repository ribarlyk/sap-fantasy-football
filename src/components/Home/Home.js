import "./Home.scss";
import { motion } from "framer-motion";
import BasicGrid from "./Grid";

export default function Home() {
    return (
        <div className="home-container">
            <h1>HEADLINES</h1>
            <BasicGrid />
        </div>
    );
}
