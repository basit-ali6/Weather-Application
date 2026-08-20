import { getWeather } from "./weatherApiHandle.js"
import countries from "i18n-iso-countries";



const input = document.getElementById("location")
const content = document.querySelector(".content");
let currentWeather = null;
let isCelsius = true;

export async function renderProject() {
    if (input.value.trim()) {
        let location = input.value.trim()
        const countryNames = countries.getNames("en")
        for (const [countryCode, countryName] of Object.entries(countryNames)) {
            if (location.toLowerCase().endsWith(countryName.toLowerCase())) {
                const city = location.slice(0, -countryName.length).trim()
                location = `${city},${countryCode}`
                console.log(location)
                break;

            }

        }


       try {
         const weather = await getWeather(location)
        
        currentWeather = weather;
        isCelsius = true


        document.body.classList.remove(
            "cold",
            "cool",
            "normal",
            "hot",
            "very-hot"
        );

        if (weather.temperature <= 10) {
            document.body.classList.add("cold");
        } else if (weather.temperature <= 20) {
            document.body.classList.add("cool");
        } else if (weather.temperature <= 30) {
            document.body.classList.add("normal");
        } else if (weather.temperature <= 40) {
            document.body.classList.add("hot");
        } else {
            document.body.classList.add("very-hot");
        }

        displayWeather();
        input.value = ""
       } catch (error) {
        content.textContent ="City not found. Please enter a valid location."
       }

    }
}

function displayWeather() {
    if (!currentWeather) {
        return
    }
    const countryName = countries.getName(currentWeather.country)
    let temperature;
    let feelsLike;
    let tempMin;
    let tempMax;
    let unit;
    if (isCelsius) {

        temperature = currentWeather.temperature;
        feelsLike = currentWeather.feelsLike;
        tempMin = currentWeather.tempMin;
        tempMax = currentWeather.tempMax;

        unit = "°C";

    } else {
        temperature =
            (currentWeather.temperature * 9 / 5) + 32;

        feelsLike =
            (currentWeather.feelsLike * 9 / 5) + 32;

        tempMin =
            (currentWeather.tempMin * 9 / 5) + 32;

        tempMax =
            (currentWeather.tempMax * 9 / 5) + 32;

        unit = "°F";
    }
    content.innerHTML = `
        City: ${currentWeather.city}<br>

        Country: ${countryName}<br>

        Temperature:
        ${temperature.toFixed(1)}${unit}<br>

        Feels Like:
        ${feelsLike.toFixed(1)}${unit}<br>

        Condition:
        ${currentWeather.condition}<br>

        Description:
        ${currentWeather.description}<br>

        Humidity:
        ${currentWeather.humidity}%<br>

        Wind Speed:
        ${currentWeather.windSpeed} m/s<br>

        Pressure:
        ${currentWeather.pressure} hPa<br>

        Visibility:
        ${currentWeather.visibility}<br>

        Min Temperature:
        ${tempMin.toFixed(1)}${unit}<br>

        Max Temperature:
        ${tempMax.toFixed(1)}${unit}
    `;
}
export function toggleTemperature() {

    if (!currentWeather) {
        return;
    }

    isCelsius = !isCelsius;

    const toggleBtn = document.querySelector("#unit-toggle");

    if (isCelsius) {
        toggleBtn.textContent = "Switch to °F";
    } else {
        toggleBtn.textContent = "Switch to °C";
    }

    displayWeather();
}

