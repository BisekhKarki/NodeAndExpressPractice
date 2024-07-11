require('dotenv').config()
require('express-async-errors')

// async errors




// express framework
const express = require('express')
const app = express();
const productsRouter = require('./routes/products')
const connectDB = require("./db/connect")
const port = 3000;





const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require("./middleware/error-handler")


// middleware
app.use(express.json())





// routes
// app.get('/',(req,res)=>{
//     res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>  ')
// })


app.use('/api/v1/products',productsRouter)


// product route




app.use(notFoundMiddleware)
app.use(errorMiddleware)




const start = async ()=>{
    try {
        // connectDB
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`Server running at ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()