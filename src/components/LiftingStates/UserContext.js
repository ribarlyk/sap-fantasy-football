import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isSigned, setIsSigned] = useState(false);

  return (
    <UserContext.Provider value={[ isSigned, setIsSigned ]}>
      {children}
    </UserContext.Provider>
  );
};
