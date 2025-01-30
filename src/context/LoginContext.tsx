import { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react";

// Define the shape of the context
export interface LoginContextType {
    loginVisible: boolean,
    type: number
}

// Add a type for the context value (state + setState)
export interface LoginContextValue {
    state: LoginContextType;
    setState: Dispatch<SetStateAction<LoginContextType>>;
}

// Default context state
export const defaultLoginContext: LoginContextType = {
    loginVisible: false,
    // 0 login 1 signup
    type: 0 
};

// Create the context
export const LoginContext = createContext<LoginContextValue>({
    state: defaultLoginContext,
    setState: () => { },
});

// LoginProvider component
export const LoginProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<LoginContextType>(defaultLoginContext);

    return (
        <LoginContext.Provider value={{ state, setState }}>
            {children}
        </LoginContext.Provider>
    );
};
