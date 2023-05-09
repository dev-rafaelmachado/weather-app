import { useState, createContext } from 'react';

const ThemeContext = createContext();
const themeSaved = localStorage.getItem('themeSaved');

function ThemeProvider(props) {
    const [theme, setTheme] = useState(themeSaved === null ? "ligth" : themeSaved);
  
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {props.children}
      </ThemeContext.Provider>
    );
  }

export { ThemeContext, ThemeProvider };
