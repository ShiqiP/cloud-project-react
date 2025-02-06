import { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";

// Define the shape of the context
export interface authContextType {
    isAuth: boolean,
    name: string,
    email: string,
    image_url?: string,
    token: string
}

// Add a type for the context value (state + setState)
export interface AuthContextValue {
    state: authContextType;
    setState: Dispatch<SetStateAction<authContextType>>;
}

// Default context state
export const defaultAuthContext: authContextType = {
    isAuth: false,
    name: "",
    email: "",
    image_url: "",
    token: ""
};

// Create the context
export const AuthContext = createContext<AuthContextValue>({
    state: defaultAuthContext,
    setState: () => { },
});

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<authContextType>(defaultAuthContext);
    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("auth"))
        if (auth)
            setState(auth);
    }, [])
    return (
        <AuthContext.Provider value={{ state, setState }}>
            {children}
        </AuthContext.Provider>
    );
};
