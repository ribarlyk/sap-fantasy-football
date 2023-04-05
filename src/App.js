import Header from "./components/Header/Header";
import MyTeam from "./components/MyTeam/MyTeam";
import Home from "./components/Home/Home";
import Standings from "./components/Standings/Standings";
import MatchDay from "./components/MatchDay/Match";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/Profile";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/my-team" element={<MyTeam />} />
                <Route path="/standings" element={<Standings />} />
                <Route path="/match-day" element={<MatchDay />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    );
}

export default App;
