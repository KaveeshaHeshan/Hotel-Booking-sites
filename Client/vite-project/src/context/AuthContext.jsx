import { createContext, useContext, useEffect, useState } from "react";

import * as auth from "../mocks/authService.js";


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  const login = async (email, password) => {
    const u = await auth.login(email, password);
    setUser(u);
    return u;
  };

  const register = async (name, email, password) => {
    await auth.register(name, email, password);
  };

  const logout = () => {
    auth.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
