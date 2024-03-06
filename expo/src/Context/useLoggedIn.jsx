import React, { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLoggedIn = createContext();

export default function useLoggedInContex({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    (async () => {
      await AsyncStorage.getItem("token", () => setIsLogged(true));
    })();
  }, [isLogged]);

  return (
    <useLoggedIn.Provider value={[isLogged, setIsLogged]}>
      {children}
    </useLoggedIn.Provider>
  );
}

export { useLoggedIn };
