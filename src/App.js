import Header from "./components/Header/Header";
import MyTeam from "./components/MyTeam/MyTeam";
import Home from "./components/Home/Home";
import Standings from "./components/Standings/Standings";
import MatchDay from "./components/MatchDay/Match";
import { Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import News from "./components/News/News";
import Rules from "./components/Rules/Rules";

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
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/news" element={<News />} />
                <Route path="/rules" element={<Rules />} />
            </Routes>
        </div>
    );
}

export default App;
