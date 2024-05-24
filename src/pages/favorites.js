import { useWeather } from '../context/WeatherContext';
import { Card, CardContent, Typography, Button } from '@mui/material';
import Link from 'next/link';

const Favorites = () => {
  const { favorites, removeFavorite } = useWeather();

  return (
    <div>
      <Typography variant="h4">Favorite Cities</Typography>
      {favorites.length === 0 ? (
        <Typography>No favorite cities</Typography>
      ) : (
        favorites.map((city) => (
          <Card key={city}>
            <CardContent>
              <Typography variant="h5">{city}</Typography>
              <Link href={`/${city}`}>
                <Button variant="contained" color="primary">
                  View Details
                </Button>
              </Link>
              <Button variant="contained" color="secondary" onClick={() => removeFavorite(city)}>
                Remove from Favorites
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Favorites;
