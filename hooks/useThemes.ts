import { useState } from "react";


export const useThemes = () => {

    const [theme, setTheme] = useState('');

    const toggleTheme = () => {
        changeTheme();
        setTheme(theme === '' ? 'dark' : '');
    }

    const changeTheme = () => {
        if(theme === '') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    return { theme, toggleTheme }
} 
