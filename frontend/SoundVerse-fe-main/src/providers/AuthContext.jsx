import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isArtist, setIsArtist] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getCurrentUser = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/me", {
                method: "GET",
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
                setIsArtist(data.role === "ARTIST");
            } else {
                setUser(null);
                navigate("/auth");
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null);
            navigate("/auth");
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            if (response.ok) {
                setUser(null);
                navigate("/auth");
            }
        } catch (error) {
            console.error("Error logout:", error);
            setUser(null);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    useEffect(() => {
        if (!loading && user === null) {
            const currentPath = window.location.pathname;
            if (currentPath == "/auth" || currentPath == "/auth/signup") {
                navigate("/auth");
            }
        }
    }, [user, loading, navigate]);    

    return (
        <AuthContext.Provider value={{ user, loading, setUser, getCurrentUser, isArtist, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);