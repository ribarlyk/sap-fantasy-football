import React, { useEffect, useState } from "react";
import ClubBadges from "../Badges/ClubBadges";
import ResponsiveAppBar from "../Navigation/Navigation";
import logo from "../../assets/images/premier-league-logo.jpg";
import { Link } from "react-router-dom";
import "./Header.scss";

export default function Header() {
    const [shrinkHeader, setShrinkHeader] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setShrinkHeader(true);
        } else {
            setShrinkHeader(false);
        }
    };

    return (
        <header
            className={`header ${shrinkHeader ? "shrink" : ""}`}
            style={{ zIndex: 1 }}
        >
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
                    className={`logo ${shrinkHeader ? "shrink" : ""}`}
                />
            </Link>

            <div className="links-container" style={{ zIndex: 2 }}>
                <div
                    className={`club-badges-container ${
                        shrinkHeader ? "shrink" : ""
                    }`}
                >
                    <ClubBadges />
                </div>

                <ResponsiveAppBar className="responsive-app-bar" />
            </div>
        </header>
    );
}
