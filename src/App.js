import Header from "./components/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatetRoutes from "./components/Navigation/MainNavigation";
import { UserProvider } from "../src/components/LiftingStates/UserContext";
import { ResultProvider } from "../src/components/LiftingStates/ResultContext";

import Footer from "./components/Footer/Footer";
function App() {
    return (
        <div className="App">
            <UserProvider>
                <ResultProvider>
                    <Router>
                        <Header />
                        <AnimatetRoutes />
                        <Footer />
                    </Router>
                </ResultProvider>
            </UserProvider>
        </div>
    );
}

export default App;
