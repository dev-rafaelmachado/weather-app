import "./css/button.css";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const Button = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const handdleThemeChanger = () =>{
    const newTheme = theme === "ligth" ? 'dark' : 'ligth'
    localStorage.setItem('themeSaved', newTheme);
    setTheme(newTheme)
  }
  return (
    <div>
      <input onChange={handdleThemeChanger} type="checkbox" className="checkbox" id="chk" />
      <label className={`label ${theme}`} htmlFor="chk">
        <i className="fas fa-moon"></i>
        <i className="fas fa-sun"></i>
        <div className={`ball ${theme}`} ></div>
      </label>
    </div>
  );
};

export default Button;
