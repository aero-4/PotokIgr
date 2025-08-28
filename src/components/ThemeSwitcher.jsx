import React, { useEffect, useState } from 'react';
import sunIcon from '../assets/sun.png';
import moonIcon from '../assets/moon.png';
import leafIcon from '../assets/leaf.png';

const THEMES = ['light', 'dark', 'green'];
const LABELS = {
    light: 'Светлая',
    dark:  'Тёмная',
    green: 'Зелёная',
};
const ICONS = {
    light: sunIcon,
    dark: moonIcon,
    green: leafIcon,
};

function ThemeSwitcher() {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('theme');
        if (THEMES.includes(saved)) {
            return saved;
        }
        const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    });

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const currentIndex = THEMES.indexOf(theme);
        const nextIndex = (currentIndex + 1) % THEMES.length;
        setTheme(THEMES[nextIndex]);
    };

    return (
        <button className="small_buttons rounded-2xl fixed indent-0 z-99 right-2 bottom-2" onClick={toggleTheme}>
            <img src={ICONS[theme]} alt={LABELS[theme]} className="w-8 h-8"/>
        </button>
    );
}

export default ThemeSwitcher;
