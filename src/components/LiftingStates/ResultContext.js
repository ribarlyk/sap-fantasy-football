import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useResultsContext = () => useContext(UserContext);

export const ResultProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    //   get the user and set the team to him

    return (
        <UserContext.Provider value={[results, setResults]}>
            {children}
        </UserContext.Provider>
    );
};
