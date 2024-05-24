import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchWeather, fetchForecast } from '../utils/api';
import WeatherCard from '../components/WeatherCard';
import { Container, Grid, Typography } from '@mui/material';

const CityPage = () => {
  const router = useRouter();
  const { city } = router.query;
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (city) {
      const fetchData = async () => {
        try {
          const weatherData = await fetchWeather(city);
          setWeather(weatherData);
          const forecastData = await fetchForecast(city);
          setForecast(forecastData);
          setError('');
        } catch (err) {
          setError(err.message);
        }
      };

      fetchData();
    }
  }, [city]);

  return (
    <Container>
      {error && <p>{error}</p>}
      {weather && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <WeatherCard weather={weather} />
          </Grid>
        </Grid>
      )}
      {forecast && (
        <div>
          <Typography variant="h5">Pronóstico Extendido</Typography>
          <Grid container spacing={2}>
            {forecast.list.map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <WeatherCard weather={item} />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </Container>
  );
};

export default CityPage;
