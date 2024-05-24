import { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { fetchWeather } from '../utils/api';
import { useWeather } from '../context/WeatherContext';

const Home = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const { addFavorite } = useWeather();

  const handleSearch = async () => {
    setError('');
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div>
      <TextField 
        label="Buscar ciudad" 
        variant="outlined" 
        value={city} 
        onChange={(e) => setCity(e.target.value)} 
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Buscar
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      {weather && (
        <Card>
          <CardContent>
            <Typography variant="h5">{weather.name}</Typography>
            <Typography variant="body1">Temperatura: {weather.main.temp} °C</Typography>
            <Typography variant="body1">Clima: {weather.weather[0].description}</Typography>
            <Typography variant="body1">Humedad: {weather.main.humidity}%</Typography>
            <Typography variant="body1">Viento: {weather.wind.speed} m/s</Typography>
            <Button onClick={() => addFavorite(weather.name)}>Agregar a Favoritos</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Home;