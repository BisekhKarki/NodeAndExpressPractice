const mongoose = require('mongoose')
const mongoKey = require('../config/keys').MongoURI

const connection = mongoose.connect(mongoKey,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err))


module.exports = connection