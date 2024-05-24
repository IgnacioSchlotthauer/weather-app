export const fetchWeather = async (city) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_RAPIDAPI_KEY}&units=metric`);
    if (!res.ok) {
      throw new Error('City not found');
    }
    return await res.json();
  };


export const fetchForecast = async (city) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_RAPIDAPI_KEY}&units=metric`);
    if (!res.ok) {
      throw new Error('City not found');
    }
    return await res.json();
  };