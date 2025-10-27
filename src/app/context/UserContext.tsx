"use client"
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
  token?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const [user, setUser]  = useState<User | null>(null)

     useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

   const handleSetUser = (user: User | null) => {
    setUser(user);
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  };

  

    const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login"); 
  };
  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside UserProvider");
  return context;
};
