const Task = require("../models/Task")
const asyncWrapper = require("../middleware/async")
const {
    createCustomError
} = require("../errors/custom-error")


// To get all task
const getAllTasks = asyncWrapper( async (req,res)=>{

    const tasks = await Task.find({})
    res.status(200).json({ tasks })

})

// To create a task
// 201 is for successful
const createTask = asyncWrapper(
    async (req,res)=>{
        const task = await Task.create(req.body)
        res.status(201).json({task}) 
    }
) 



// // To get single a task
// const getTask =  asyncWrapper(
//     async (req,res,next)=>{
//             const taskID = req.params.id
//             const task = await Task.findOne({_id:taskID})
//             if(!task){
//                 const error = new Error("Not found")
//                 error.status = 404;
//                 return next(error)
//                 return res.status(404).json({msg:`No task with id: ${taskID}`})
//             }
//             res.status(200).json({ task })
//             // res.status(200).json({ task:null, status:"success" })
//     }
    
// ) 


// To get single a task
const getTask =  asyncWrapper(
    async (req,res,next)=>{
            const taskID = req.params.id
            const task = await Task.findOne({_id:taskID})
            if(!task){
               return next(createCustomError(`No task with id: ${taskID}`,404))
            }
            // res.status(200).json({ task })
            // res.status(200).json({ task:null, status:"success" })
    }
    
)


// To delete a task
const deleteTask =  asyncWrapper(
    async (req,res)=>{
    
        const taskID = req.params.id
        const task = await Task.findOneAndDelete({ _id:taskID });
        if(!task){
            return next(createCustomError(`No task with id: ${taskID}`,404))
         }
        res.status(200).json({ task })

}
) 



// To update a task using patch
const updateTask =  asyncWrapper(
    async (req,res)=>{
            const taskID = req.params.id
            const task = await Task.findOneAndUpdate({ _id:taskID } , req.body,{
                new:true,
                runValidators:true,
            });
            if(!task){
                return next(createCustomError(`No task with id: ${taskID}`,404))
             }
            res.status(200).json({ task })
    
    }
    
) 


// To update a task using put
// const editTask = async (req,res)=>{
//     try{
//         const taskID = req.params.id
//         const task = await Task.findOneAndUpdate({ _id:taskID } , req.body,{
//             new:true,
//             runValidators:true,
//         });
//         if(!task){
//             return res.status(404).json({msg:`No task with id: ${taskID}`})
//         }
//         res.status(200).json({ task })

//     }catch(err){
//         res.status(500).json({msg:e})
//     }
// }




module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    // editTask
}