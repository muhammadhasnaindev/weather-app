import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const WeatherCard = ({ data }) => {
  return (
    <Card className="w-full md:w-[400px] mx-auto mt-10 shadow-xl bg-blue-100 rounded-2xl">
      <CardContent className="text-center">
        <WbSunnyIcon fontSize="large" className="text-yellow-500 mb-2" />
        <Typography variant="h5">{data.name}</Typography>
        <Typography variant="h6">{data.weather[0].description}</Typography>
        <Typography variant="h4" className="mt-2">{data.main.temp}°C</Typography>
        <div className="flex justify-around mt-4">
          <Typography>Humidity: {data.main.humidity}%</Typography>
          <Typography>Wind: {data.wind.speed} m/s</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
