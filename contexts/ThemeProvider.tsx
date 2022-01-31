import React, { useState, useEffect, useContext, createContext } from "react";

/**
 * theme {boolean}: if this value is true then the colorscheme would be for light theme else for dark theme
 * toggleTheme {Function}: the toggleTheme function used for changing or toggling the theme
 */
interface ThemeContextProviderProps {
    theme: boolean;
    toggleTheme(): void;
}
// the context which is the main theme data provider throughout the application
const ThemeProviderContext = createContext<ThemeContextProviderProps>({
    theme: true,
    toggleTheme: () => {},
});
interface ThemeProviderProps {
    children: React.ReactNode;
}
export default function ThemeProvider(props: ThemeProviderProps) {
    // main theme variable to control the theme
    const [theme, setTheme] = useState(true);

    // get the theme data from the local storage of the browser
    // and setting it to the state
    // in this way we can save the theme data for the user to revisit and load the same theme data
    // no need to toggle each time the user visits the website
    useEffect(() => {
        // getting the theme from local storage
        const localTheme = localStorage.theme;
        setTheme(localTheme === "true" ? true : false); // setting the state value for them

        // also setting the color selector for css attributes
        if (theme) document.body.classList.value = "light";
        else document.body.classList.value = "dark";
    }, []);

    // update the local storage theme property data whenever the user toggles the Theme
    useEffect(() => {
        localStorage.theme = String(theme);

        // also setting the color selector for css attributes
        if (theme) document.body.classList.value = "light";
        else document.body.classList.value = "dark";
    }, [theme]);

    // the toggle theme function to
    // toggle the theme (true / false)...
    const toggleTheme = () => setTheme((value) => !value);

    // values provided to other parts of the application
    const value = {
        theme,
        toggleTheme,
    };
    return (
        <ThemeProviderContext.Provider value={value}>
            <div className={theme ? "light-theme" : "dark-theme"}>{props.children}</div>
        </ThemeProviderContext.Provider>
    );
}
// usable context api
export const useTheme = () => useContext(ThemeProviderContext);
