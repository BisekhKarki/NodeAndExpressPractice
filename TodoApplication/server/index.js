const express = require('express')
const app = express();
const PORT = process.env.PORT || 4000
const connect = require("./db/connect")
const todoRoute = require("./routes/route")


app.use(express.json())
app.use("/todos",todoRoute)



const server = async ()=>{
    try {
        await connect
        app.listen(PORT,async ()=>{
            console.log(`Server running at ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}


server();
