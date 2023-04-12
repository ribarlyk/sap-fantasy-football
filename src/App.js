import Header from "./components/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatetRoutes from "./components/Navigation/MainNavigation";
import { UserProvider } from "../src/components/LiftingStates/UserContext"
import Footer from "./components/Footer/Footer";
function App() {
    return (
        <div className="App">
            <UserProvider>
                <Router>
                    <Header />
                    <AnimatetRoutes />
                    <Footer/>
                </Router>
            </UserProvider>
        </div>
    );
}

export default App;
