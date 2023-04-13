import "./Home.scss";
import { motion } from "framer-motion";
import BasicGrid from "./Grid";
import Header from "./Header";

export default function Home() {
    return (
        <div className="home-container">
            <Header title="HEADLINES" />
            <BasicGrid />
        </div>
    );
}
