import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useProfileContext = () => useContext(UserContext);

export const ProfileProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState(
        JSON.parse(localStorage.getItem("loggedUser"))
    );

    const updateProfilePic = (username, newProfilePic) => {
        setLoggedUser((prevLoggedUser) => {
            if (prevLoggedUser?.username === username) {
                const updatedLoggedUser = {
                    ...prevLoggedUser,
                    profilePic: newProfilePic,
                };
                localStorage.setItem(
                    "loggedUser",
                    JSON.stringify(updatedLoggedUser)
                );
                return updatedLoggedUser;
            }
            return prevLoggedUser;
        });
    };

    return (
        <UserContext.Provider
            value={[{ loggedUser, setLoggedUser, updateProfilePic }]}
        >
            {children}
        </UserContext.Provider>
    );
};

// import { createContext, useContext, useState } from 'react';

// const ProfileContext = createContext();

// export const useProfileContext = () => {
//     return useContext(ProfileContext);
// };

// export const ProfileProvider = ({ children }) => {
//     const [profilePic, setProfilePic] = useState('');

//     const updateProfilePic = (username, newProfilePic) => {
//         setProfilePic(newProfilePic);
//     };

//     const value = {
//         profilePic,
//         updateProfilePic
//     };

//     return (
//         <ProfileContext.Provider value={value}>
//             {children}
//         </ProfileContext.Provider>
//     );
// };
