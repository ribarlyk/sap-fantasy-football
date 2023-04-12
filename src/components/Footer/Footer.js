import React from "react";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import "./Footer.scss"
export default function Footer() {
    return (
        <footer>
            <nav>
                <ul>
                    <li>
                        <a href="https://www.premierleague.com/" target="_blank">
                            Premier League
                        </a>
                    </li>
                    <li>
                        <a href="https://www.premierleague.com/news" target="_blank">News</a>
                    </li>
                    <li>
                        <a href="https://www.premierleague.com/fixtures" target="_blank">
                            Fixtures
                        </a>
                    </li>
                    <li>
                        <a href="https://www.premierleague.com/tables" target="_blank">
                            Tables
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="social-icons">
                <a href="https://twitter.com/" target="_blank">
                    <FaTwitter />
                </a>
                <a href="https://www.facebook.com/" target="_blank">
                    <FaFacebook />
                </a>
                <a href="https://www.instagram.com/" target="_blank">
                    <FaInstagram />
                </a>
            </div>
        </footer>
    );
}
