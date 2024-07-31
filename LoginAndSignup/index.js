const express = require('express')
const app = express();
const PORT = 3000;
const path = require('path')
const loginRouter = require('./backend/routes/Login')
const signupRouter = require('./backend/routes/Singup')


app.use(express.json())

// for static files
app.use(express.static(path.join(__dirname,'public')))


// for router
// app.use("/login")
app.use(loginRouter)
app.use(signupRouter)




app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`)
})