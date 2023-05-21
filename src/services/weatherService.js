import { DateTime } from "luxon";

const API_KEY = 'ff0f56c1e3fdee3e1452ccdd5da42807';
const BASE_URL = "https://api.openweathermap.org/data/2.5";  

const getWeatherData = async (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY});
    
     const res = await fetch(BASE_URL);
    return await res.json(); 
    
};




 

const formatCurrentWeather = (data) => {
    console.log('API Response:', data);
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed}
    } = data

    const {main:details, icon} = weather[0]
    return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed}
}

const formatForecastWeather = (data) => {
    console.log('Data:', data);
    let { timezone, daily, hourly } = data;
    daily = daily.slice(1, 6).map(d => {
        return { /*  */
            title: formatToLocalTime(d.dt, timezone, "ccc"),
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    });

    hourly = hourly.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp,
            icon: d.weather[0].icon
        }
    });

    return {timezone, daily, hourly}
};

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData(
        'weather',
         searchParams
         ).then(formatCurrentWeather);

    const { lat, lon } = formatCurrentWeather;

    const formattedForecastWeather = await getWeatherData("onecall", 
    {
        lat,
        lon,
        exclude: "current,minutely,alerts",
        units: searchParams.units
    }).then(formatForecastWeather)

    return {...formattedCurrentWeather, ...formattedForecastWeather};
}

const formatToLocalTime = (secs,
     zone,
     format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
     ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData;
export { formatToLocalTime, iconUrlFromCode };




// finish this code part