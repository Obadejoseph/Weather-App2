require('dotenv').config();
const express = require('express')
const PORT = process.env.PORT ||2222
const DB = process.env.DB;
const cors = require('cors')
const weather = require('./router/weatherRouter')
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/v1',weather)


app.use((error,req,res,next)=>{
    if (error){
        return res.status(500).json({
            message:`error.message`
        })
    }
    next();
})

   app.listen(PORT,()=>{
        console.log(`server is running on PORT ${PORT}`);
    })
