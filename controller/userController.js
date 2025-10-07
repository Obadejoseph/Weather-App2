require('dotenv').config();
const weatherModel = require('../model/usermodel')

const axios = require('axios')


const WEALTHER_API_KEY = process.env.WEATHER_API_KEY;
console.log(WEALTHER_API_KEY);


exports.getWeather = async (req,res) => {
    
    const city = req.query.city; 
    
    if (!city){
        return res.status(401).json({
            error:"city name is required"
        })
    }
    try{

            // const url =` https://api.openweathermap.org/data/2.5/weather?q=city&units=metric&appid=3515870a6d4d576f716721b1aa13fe36 `;

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3515870a6d4d576f716721b1aa13fe36&units=metric`;

            const response = await axios.get(url);
            const data = response.data;

            const weatherData = {
                city:data.name,
                temperature:data.main.temp,
                condition:data.weather[0].description,
                windSpeed:data.wind.speed,

            };

            // const savedWeather = await weatherModel.create(weatherData);

        const savedWeather = new weatherModel(weatherData);
        await savedWeather.save();

            res.status(200).json({
                message:`weather data fecthed succefully`,
                data:savedWeather
            })
console.log(savedWeather);



        
    } catch (error) {
        if(error.response && error.response.status === 404){
            return res.status(404).json({
                message:`citynot found`
            })

        }
        res.status(500).json({
            message:`internal server error,An error occured while fetching data`,
            error:error.message
        })
    }
}

exports.getAllWeather = async (req,res) => {
    try {
        const weatherData = await weatherModel.find().sort({createdAt: -1});

        res.status(200).json({
           success: true,
            message: "weather records retrieved successfuly",
            data: weatherData

        })
        
    } catch (error) {
        res.status(500).json({
            message:`internal server error, failed to retrieve weather records `,
            error:error.message
        })
    }
}
