const API_KEY = process.env.OPENWEATHER_API_KEY

export async function getWeather(location) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric`)
    const data = await response.json()
       
       
    return {
        city: data.name,
        country: data.sys.country,

        temperature: data.main.temp,
        feelsLike: data.main.feels_like,

        condition: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,

        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,

        visibility: data.visibility,

        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max
    }


}