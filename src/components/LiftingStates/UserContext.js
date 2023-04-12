import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    // const [user, setUser] =
    //     useState(JSON.parse(localStorage.getItem("loggedUser")))?.username ||
    //     null;
    const [isSigned, setIsSigned] = useState(false);

    //   const [username, setUsername] = useState(''); get the user and set the team to him

    return (
        <UserContext.Provider value={[isSigned, setIsSigned]}>
            {children}
        </UserContext.Provider>
    );
};
