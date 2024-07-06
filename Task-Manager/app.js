const express = require("express")
const app = express();
const port = process.env.PORT || 3000
const tasks = require("./routes/task")
const connectDB = require("./db/connect")
require("dotenv").config()
const notFound = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")


// middleware
app.use(express.static("./public"))
app.use(express.json())



// routes
``
app.use("/api/v1/tasks",tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)



// app.get('/api/v1/tasks')  - get all the tasks
// app.post('/api/v1/tasks')  - create a new task
// app.get('/api/v1/tasks/:id')  - get single task
// app.patch('/api/v1/tasks/:id')  - update task
// app.delete('/api/v1/tasks/:id')  - delete task


const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log("Server running at port",port)
        })
    }catch(err){
        console.log(err)
    }

}

start()
