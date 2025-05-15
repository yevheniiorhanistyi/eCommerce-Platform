'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface IAuthContextType {
  isAuthenticated: boolean;
  setAuthentication: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthContextProvider');
  }

  return context;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setAuthentication] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/status');
        const data = await res.json();

        setAuthentication(data.isAuthenticated);
      } catch {
        setAuthentication(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};
