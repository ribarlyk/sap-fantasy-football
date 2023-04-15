import React from "react";
import MyTeam from '../MyTeam/MyTeam'
import Home from "../Home/Home";
import Standings from "../Standings/Standings";
import MatchDay from "../MatchDay/Match";
import { Route, Routes, useLocation } from "react-router-dom";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import News from "../News/News";
import Rules from "../Rules/Rules";
import { AnimatePresence } from 'framer-motion'
import Error from "../Error/Error";
export default function AnimatetRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/my-team" element={<MyTeam />} />
                <Route path="/standings" element={<Standings />} />
                <Route path="/match-day" element={<MatchDay />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/news" element={<News />} />
                <Route path="/rules" element={<Rules />} />
                <Route path = "*" element={<Error/>} />
            </Routes>
        </AnimatePresence>
    )
}