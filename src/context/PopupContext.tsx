import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define the type for the popup context
interface PopupContextType {
    showPopup: (message: string) => void;
}

// Create the context with a default value
const PopupContext = createContext<PopupContextType | undefined>(undefined);

// Provider Component
export function PopupProvider({ children }: { children: ReactNode }) {
    const [popup, setPopup] = useState({ isVisible: false, message: "", fadingOut: false });

    const showPopup = (message: string) => {
        setPopup({ isVisible: true, message, fadingOut: false });

        // Start fade-out after 1.8 seconds
        setTimeout(() => {
            setPopup((prev) => ({ ...prev, fadingOut: true }));
        }, 900);

        // Completely hide the popup after 2 seconds
        setTimeout(() => {
            setPopup({ isVisible: false, message: "", fadingOut: false });
        }, 1000);
    };

    const hidePopup = () => {
        setPopup({ isVisible: false, message: "", fadingOut: false });
    };

    return (
        <PopupContext.Provider value={{ showPopup }}>
            {popup.isVisible && (
                <div
                    className={`z-50 fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg transition-opacity duration-200 ${popup.fadingOut ? "opacity-0" : "opacity-100"
                        }`}
                    role="alert"
                >
                    <span className="block sm:inline">{popup.message}</span>

                </div>
            )}
            {children}
        </PopupContext.Provider>
    );
}

// Custom Hook for using the PopupContext
export const usePopup = (): PopupContextType => {
    const context = useContext(PopupContext);
    if (!context) {
        throw new Error("usePopup must be used within a PopupProvider");
    }
    return context;
};
