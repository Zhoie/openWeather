import { weatherType } from "@/types/weatherType";

export async function getWeatherData(city: string) {
    // const defaultCity = 'Tokyo'
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`

    const res = await fetch(weatherUrl)
    const data: weatherType = await res.json()
    const celsiusTemperature = Number((data.main.temp - 273.15).toFixed(2))
    const celsiusFeelsLike = Number((data.main.feels_like - 273.15).toFixed(2))
    const celsiusMax = Number((data.main.temp_max - 273.15).toFixed(2))
    const celsiusMin = Number((data.main.temp_min - 273.15).toFixed(2))
    data.main.temp = celsiusTemperature
    data.main.feels_like = celsiusFeelsLike
    data.main.temp_max = celsiusMax
    data.main.temp_min = celsiusMin
    console.log(data)
    return data

}