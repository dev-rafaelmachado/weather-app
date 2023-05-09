import "./App.css";
import { useState, useEffect, useContext } from "react";
import Input from "./components/Input";
import Card from "./components/Card";
import Button from "./components/Button";
import axios from "axios";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const [city, setCity] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=76c4f680be0a43f5a64c8348911669ad`;
      axios
        .get(url)
        .then((response) => {
          const city = response.data.results[0].components.city;
          setCity(city);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, []);

  return (
    <div className={`App ${theme}`}>
      <Input setCity={setCity} />
        <Card city={city} />
      <div className="Btn">
        <Button />
      </div>
    </div>
  );
}

export default App;
