import ClubBadges from "../Badges/ClubBadges";
import ResponsiveAppBar from "../Navigation/Navigation";
import logo from "../../assets/images/premier-league-logo.jpg";

import "./Header.css";
export default function Header() {
    return (
        <header className="header">
            <img
                src={logo}
                width="250px"
                height="200px"
                alt=""
                className="pl-logo"
            />
            <div className="links-container">
                <ClubBadges />
                <ResponsiveAppBar />
            </div>
        </header>
    );
}
