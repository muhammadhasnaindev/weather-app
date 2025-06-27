import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Multan&units=metric&appid=${API_KEY}`;
  const res = await axios.get(url);
  return res.data;
};
