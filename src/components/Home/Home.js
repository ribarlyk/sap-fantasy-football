import "./Home.scss";
import { motion } from "framer-motion";
import BasicGrid from "./Grid";
import Headers from "./Headers";

export default function Home() {
    return (
        <div className="home-container">
            <Headers title="HEADLINES" />
            <BasicGrid />
        </div>
    );
}
