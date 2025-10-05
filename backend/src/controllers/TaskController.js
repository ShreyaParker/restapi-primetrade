import Task from "../models/Task.js"
import joi from "joi";

const taskSchema  = joi.object({
    title: joi.string().min(3).max(10).required(),
    description: joi.allow('').optional(),
    status: joi.string().valid('pending','in-progress','completed').optional()


})

export const getTasks= async (req,res,next) => {
    try{
        const tasks = await Task.find({user:req.user.id});
        if(!tasks){
            res.status(404).json({message:'Task not found'});
        }
        res.json(tasks);


    }catch (e){
        next(e);
    }
}

export const getTaskById = async (req,res,next) =>{
    try{
        const task = await Task.findOne({
            task:req.params.task,
            user:req.user._id
        })

        if(!task){
            res.send(404).json({message:"task not found"})
        }

        res.status(201).json(task);
    }catch(e){
        next(e);
    }
}

export const createTask = async(req,res,next)=>{
    try{
        const { error } = taskSchema.validate(req.body);
        if(error) return res.status(400).json({message:error.details[0].message});

        const task = new Task ({
            ...req.body,
            user:req.user._id,
        })

        await task.save();
        res.status(201).json(task);
    }catch (e){
        next(e);
    }
}
export const updateTask = async(req,res,next)=>{
    try{
        const {error } = taskSchema.validate(req.body);
        if(error ) return res.status(400).json({message:error.details[0].message});
        const task = await Task.findOneAndUpdate({
            _id: req.params.taskId,
            user: req.user.id,

        },{
            $set:req.body,
        },{
            new:true,runValidators :true
        })

        if(!task){
            return  res.status(404).json({message:"Task not found or unauthorized"})
        }
        res.status(201).json(task);
    }catch (e){
        next(e);
    }

}
export const deleteTask = async(req,res,next)=>{
    try{
        const task = await Task.findByIdAndDelete({
            _id:req.params.taskId,
            user: req.user.id,
        })
        if(!task){
            return res.status(404).json({message:"Task not found"})
        }

        res.status(204).send();
    }
    catch (e){
        next(e);
    }
}