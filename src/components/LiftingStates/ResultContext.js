import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useResultsContext = () => useContext(UserContext);

export const ResultProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [navBoolean, setNavBoolean] = useState(false);
    return (
        <UserContext.Provider
            value={[results, setResults, navBoolean, setNavBoolean]}
        >
            {children}
        </UserContext.Provider>
    );
};
