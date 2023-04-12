import Header from "./components/Header/Header";
// import MyTeam from "./components/MyTeam/MyTeam";
// import Home from "./components/Home/Home";
// import Standings from "./components/Standings/Standings";
// import MatchDay from "./components/MatchDay/Match";
// import { Route, Routes } from "react-router-dom";
// import Profile from "./components/Profile/Profile";
// import Login from "./components/Login/Login";
// import Register from "./components/Register/Register";
// import News from "./components/News/News";
// import Rules from "./components/Rules/Rules";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatetRoutes from "./components/Navigation/MainNavigation";
import { UserProvider } from "../src/components/LiftingStates/UserContext"
function App() {
    return (
        <div className="App">
            <UserProvider>
                <Router>
                    <Header />
                    <AnimatetRoutes />
                </Router>
            </UserProvider>
        </div>
    );
}

export default App;
