import { useContext,useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import useWeatherAPI from "../hooks/useWeatherAPI";
import "./css/Card.css";

const Card = ({ city }) => { 
  const weather = useWeatherAPI(city);
  const { theme } = useContext(ThemeContext);
  const [celsius, setCelsius] = useState(true)
  
  if (!weather) {
    return (
      <div className={`card ${theme}`}>
        <h2>Carregando...</h2>
      </div>
    );
  }

  const othersDays = weather.forecast;
  const daysOfWeek = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  const kelvinTo = (p_kelvin) => {
    if (celsius) {
      return (p_kelvin - 273.15).toFixed(0) + "ºC";
    }
    return (((p_kelvin - 273.15) * 9) / 5 + 32).toFixed(0) + "ºF";
  };

  const handleChangeCelsius = () =>{
    setCelsius(!celsius)
  }

  return (
    <div className={`card ${theme}`}>
      <h1>{weather.city}</h1>
      <h2>{kelvinTo(weather.forecast[0].temperature)}</h2>
      <img
        src={`http://openweathermap.org/img/w/${weather.forecast[0].icon}.png`}
        alt={weather.forecast[0].description}
      />
      <div className={`list ${theme}`}>
        {othersDays.map((item, index) => {
          if (index === 0) return null;
          const date = new Date(item.date);
          return (
            <div key={index} className={`mini-card ${theme}`}>
              <h5>{daysOfWeek[date.getDay()].substring(0, 3)}</h5>
              <img
                width={35}
                src={`http://openweathermap.org/img/w/${item.icon}.png`}
                alt={item.description}
              />
              <h6>{kelvinTo(item.temperature)}</h6>
            </div>
          );
        })}
      </div>
      <button className={`measurement ${theme}`} onClick={handleChangeCelsius}>
        <h3>{!celsius ? "ºC" : "ºF"}</h3>
      </button>
    </div>
  );
};

export default Card;
