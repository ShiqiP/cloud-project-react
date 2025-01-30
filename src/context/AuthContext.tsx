import { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";

// Define the shape of the context
export interface authContextType {
    id: string,
    isAuth: boolean,
    fullName: string,
    email: string;
    enc_data: string;
    hash_data: string;
}

// Add a type for the context value (state + setState)
export interface AuthContextValue {
    state: authContextType;
    setState: Dispatch<SetStateAction<authContextType>>;
}

// Default context state
export const defaultAuthContext: authContextType = {
    id: "",
    isAuth: false,
    fullName: "",
    email: "",
    enc_data: "",
    hash_data: "",
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
        if(auth)
            setState(auth);
      }, [])
    return (
        <AuthContext.Provider value={{ state, setState }}>
            {children}
        </AuthContext.Provider>
    );
};
