const mongoose = require('mongoose');
const dotenv = require('dotenv');
const mongoUrl=  "mongodb+srv://dhawalama2004:zVaB9p1Ydxa2aUfp@projects.pwtuill.mongodb.net/?retryWrites=true&w=majority&appName=TodoPractice";



const connection = mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("Database connected")).catch((error)=>console.log(error))

module.exports = connection