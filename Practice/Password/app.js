const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000;
const expressLayout = require('express-ejs-layouts')

// For database
require("./database/Mongo")





// For static files
app.use(expressLayout)
app.set('view engine','ejs')



// Body parser
app.use(express.urlencoded({extended:false}))


app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))




app.listen(PORT,()=>{
  console.log(`Server running at PORT ${PORT}`)
})
