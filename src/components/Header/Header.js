import ClubBadges from "../Badges/ClubBadges";
import ResponsiveAppBar from "../Navigation/Navigation";
import logo from "../../assets/images/premier-league-logo.jpg";
import { Link } from "react-router-dom";
import "./Header.scss";

export default function Header() {
    return (
        <header className="header">
            <Link
                to="/"
                style={{
                    color: "white",
                    textDecoration: "none",
                }}
            >
                <img
                    src={logo}
                    width="230px"
                    height="180px"
                    alt=""
                    className="pl-logo"
                />
            </Link>

            <div className="links-container">
                <ClubBadges />
                <ResponsiveAppBar />
            </div>
        </header>
    );
}
