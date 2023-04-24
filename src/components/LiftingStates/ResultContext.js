import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useResultsContext = () => useContext(UserContext);

export const ResultProvider = ({ children }) => {
    const [results, setResults] = useState([]);

    return (
        <UserContext.Provider value={[results, setResults]}>
            {children}
        </UserContext.Provider>
    );
};
