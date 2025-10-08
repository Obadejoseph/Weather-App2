

const axios = require('axios')


const WEATHER_API_KEY = process.env.WEATHER_API_KEY;


exports.getWeather = async (req, res) => {

    try {
        const city = req.query.city;

        if (!city) {
            return res.status(401).json({
                error: "city name is required"
            })
        }


        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`

        const response = await axios.get(url);
        const data = response.data;

        const weatherData = {
            city: data.name,
            temperature: data.main.temp,
            condition: data.weather[0].description,
            windSpeed: data.wind.speed,

        };

        // const savedWeather = await weatherModel.create(weatherData);


        res.status(200).json({
            message: `weather data fecthed succefully`,
            data: weatherData
        })

    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({
                message: `citynot found`
            })

        }
        res.status(500).json({
            message: `internal server error,An error occured while fetching data`,
            error: error.message
        })
    }
}
