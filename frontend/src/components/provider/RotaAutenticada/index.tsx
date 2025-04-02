import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

interface AuthContextProps {
    token: string | null;
    setToken: (token: string) => void;
}
interface RotaAutenticadaProps{
    children:React.ReactNode
}
export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<RotaAutenticadaProps> = ({ children }) => {
    const [token, setToken_] = useState<string | null>(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    const setToken = (newToken: string) => {
        setToken_(newToken);
    };


    const contextValue = useMemo(
        () => ({
          token,
          setToken,
        }),
        [token]
      );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth= () =>
{
    return useContext(AuthContext);
}
