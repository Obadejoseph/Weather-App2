const express = require('express');
const router = express.Router();

const { getWeather, getAllWeather }= require('../controller/userController')

router.get('/weather',getWeather)
router.get('/all-weather', getAllWeather)

module.exports = router;