import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [isSigned, setIsSigned] = useState(false);
    const [username, setUsername] = useState(
        JSON.parse(localStorage.getItem("loggedUser"))
    );

    return (
        <UserContext.Provider
            value={[isSigned, setIsSigned, username, setUsername]}
        >
            {children}
        </UserContext.Provider>
    );
};
