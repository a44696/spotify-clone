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
                method: "POST",
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
                setIsArtist(data.role === "ARTIST");
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

    useEffect(() => {
        if (!loading && user === null) {
            navigate("/auth");
        }
    }, [user, loading, navigate]);

    return (
        <AuthContext.Provider value={{ user, loading, setUser, getCurrentUser, isArtist }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);