import "./css/Input.css";
import { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Input = ({ setCity }) => {
  const [inputValue, setInputValue] = useState("");
  const { theme } = useContext(ThemeContext);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    if (event.keyCode === 13) {
      setCity(inputValue);
      setInputValue("");
    }
  };
  return (
    <>
      <input
        className={`${theme}`}
        onChange={handleChange}
        onKeyDown={handleSubmit}
        value={inputValue}
        type="text"
        placeholder="Sua cidade ou bairro aqui"
      />
    </>
  );
};

export default Input;
