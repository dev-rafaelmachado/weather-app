import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const useWeatherAPI = (city) => {
  const [weather, setWeather] = useState(null);
  const apiKey = "92259cc1145db76c5a5ee9cb4737b0db";
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`

  const memoizedApiCall = useMemo(() => {
    const fetchWeather = async () => {
      if (city) {
        try {
          console.log("Reload")
          const response = await axios.get(apiUrl);
          const data = response.data;
          const weatherInfo = {
            city: data.city.name,
            forecast: data.list
              .map((item) => ({
                date: item.dt_txt,
                temperature: item.main.temp,
                description: item.weather[0].description,
                icon: item.weather[0].icon,
              }))
              .filter((item, index) => index % 8 === 0),
          };
            setWeather(weatherInfo);
        } catch (error) {
          console.error(error);
          setWeather(null);
        }
      }
    };
    return fetchWeather;
  }, [apiUrl, city]);

  useEffect(() => {
    memoizedApiCall();
  }, [memoizedApiCall]);

  return weather;
};

export default useWeatherAPI;
