import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const getWeather = ({ location }) => {
    const request = axios.get(`${baseUrl}?q=${location}&appid=${apiKey}`);
    return request.then(response => response.data);
}

export default { getWeather };