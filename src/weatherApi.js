const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=7773b6d3aca57006f0a6e95b4eb007b1';

export const fetchWeather = (lat,lon) => {
    const url = rootUrl+'&lat='+lat+"&lon="+lon+"&units=metric";
    return fetch(url)
        .then(res => res.json())
        .then(json => ({
            temp: json.main.temp,
            weather: json.weather[0].main,
            cityName: json.name,
            countryName: json.sys.country,
            humidity: json.main.humidity,
            pressure: json.main.pressure,
            windSpeed: json.wind.speed,
        }))
};