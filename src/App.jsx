import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import Lottie from 'lottie-react';
import animationData from './assets/animation.json';
import { useTranslation } from 'react-i18next';
import './i18n';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [history, setHistory] = useState([]);
  const { t, i18n } = useTranslation();
  const isUrdu = i18n.language === 'ur';
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const handleSearch = async () => {
    if (!city.trim()) return;
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(res.data);
      setHistory([city, ...history.filter((item) => item !== city)]);

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      setForecast(forecastRes.data.list.filter((_, i) => i % 8 === 0));
    } catch (error) {
      alert('City not found!');
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div
      className={`w-screen h-screen 
        flex items-center justify-center 
        ${isUrdu ? 'urdu-font text-right' : ''} 
        bg-gradient-to-br
        from-[#2196F3] via-[#03A9F4] to-[#00BCD4]
        sm:from-[#673AB7] sm:via-[#9C27B0] sm:to-[#E91E63]
        md:from-[#4CAF50] md:via-[#8BC34A] md:to-[#CDDC39]
        overflow-auto px-4 sm:px-8 py-6
      `}
    >
      <div className="w-full max-w-6xl bg-white/30 backdrop-blur-sm p-6 rounded-xl shadow-2xl overflow-y-auto max-h-[95vh]">
        <div className="flex flex-col items-center justify-center gap-6">
          <Lottie animationData={animationData} className="h-40 sm:h-52 md:h-64" />

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{t('title')}</h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl">
            <TextField
              label={t('enterCity')}
              variant="outlined"
              onChange={(e) => setCity(e.target.value)}
              className="bg-white rounded text-sm sm:text-base"
              fullWidth
            />
            <Button 
              variant="contained" 
              onClick={handleSearch}
              className="text-sm sm:text-base"
            >
              {t('search')}
            </Button>
          </div>

          <div className="w-full max-w-2xl">
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              className="p-2 text-sm sm:text-base rounded bg-white"
            >
              <option value="en">English</option>
              <option value="ur">اردو</option>
            </select>
          </div>

          <div className="text-left w-full max-w-2xl">
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">
              {t('searchHistory') || 'Search History'}:
            </h2>
            <ul className="text-white list-disc pl-6 space-y-1">
              {history.map((c, i) => (
                <li key={i} onClick={() => setCity(c)} className="cursor-pointer hover:underline">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {weather && (
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
              <h2 className="text-2xl font-bold">{weather.name}</h2>
              <p>{weather.weather[0].description}</p>
              <p>{weather.main.temp} °C</p>
              <p>
                {t('humidity')}: {weather.main.humidity}% | {t('wind')}: {weather.wind.speed} m/s
              </p>
            </div>
          )}

          {forecast.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl">
              <h3 className="font-bold mb-4">{t('forecast')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {forecast.map((item, idx) => (
                  <div
                    key={idx}
                    className="border p-3 rounded shadow-sm flex flex-col text-sm"
                  >
                    <span className="font-medium">{item.dt_txt.split(' ')[0]}</span>
                    <span>{item.main.temp}°C</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
