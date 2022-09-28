import { createContext, useState } from "react";

export const AppContext = createContext(null);

export default function AppContextWrapper({ children }) {
  const [savedLocations, setSavedLocations] = useState([]);

  return (
    <AppContext.Provider value={{ savedLocations, setSavedLocations }}>
      {children}
    </AppContext.Provider>
  );
}
