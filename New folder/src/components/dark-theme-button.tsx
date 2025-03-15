import React, { useEffect, useState } from "react";

const DarkThemeButton: React.FC = () => {
    const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light");

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || "light";
        setTheme(storedTheme);
    }, []);

    useEffect(() => {
        const htmlElement = document.documentElement;
        const bodyElement = document.body;
        const lightIcon = document.querySelector(".light-icon") as HTMLElement;
        const darkIcon = document.querySelector(".dark-icon") as HTMLElement;

        htmlElement.setAttribute("data-bs-theme", theme);
        localStorage.setItem("theme", theme);
        if (lightIcon && darkIcon) {
            lightIcon.classList.toggle("active", theme === "light");
            darkIcon.classList.toggle("active", theme === "dark");
        }

        bodyElement.classList.remove("light-mode", "dark-mode");
        bodyElement.classList.add(theme === "light" ? "light-mode" : "dark-mode");
    }, [theme]);

    const toggleTheme = (): void => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <div className="dark-light-theme-btn" id="toggleBtn" onClick={toggleTheme}>
            <span className="light-icon">
                <i className="fa-light fa-sun-bright" />
            </span>
            <span className="dark-icon">
                <i className="fa-solid fa-moon" />
            </span>
        </div>
    );
};

export default DarkThemeButton;
