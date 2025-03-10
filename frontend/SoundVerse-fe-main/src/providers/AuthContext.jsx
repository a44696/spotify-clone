import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getCurrentUser = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/me", {
                method: "POST",
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                setUser(null);  
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, setUser, getCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);