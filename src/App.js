import Header from "./components/Header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatetRoutes from "./components/Navigation/MainNavigation";
import { UserProvider } from "../src/components/LiftingStates/UserContext";
import { ProfileProvider } from "./components/LiftingStates/ProfileContext";
import { ResultProvider } from "../src/components/LiftingStates/ResultContext";
import { Provider } from 'react-redux';
import store from "../src/components/store/store"

import Footer from "./components/Footer/Footer";
function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <UserProvider>
                    <ProfileProvider>
                        <ResultProvider>
                            <Router>
                                <Header />
                                <AnimatetRoutes />
                                <Footer />
                            </Router>
                        </ResultProvider>
                    </ProfileProvider>
                </UserProvider>
            </Provider>
        </div>
    );
}

export default App;
