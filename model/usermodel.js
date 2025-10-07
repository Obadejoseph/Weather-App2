const mongoose = require('mongoose')

const  userSchema = mongoose.Schema({
    city:{
        type:String,
        required:true
    },
    temperature:{
        type:Number,
        required:true
    },
    condition:{
        type:String,
        required:true
    },
    windSpeed:{
        type:String,
        required:true
    },
    createdAt: {type :Date,
       default:Date.now
    }
},{timestamps: true})

const weatherModel = mongoose.model('weather',userSchema)

module.exports = weatherModel