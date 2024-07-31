const express = require('express')
const Todo = require("../model/model")

const getAllItems = async(req,res)=>{
    try {
        const getTodo = await Todo.find({});
        res.status(200).json(getTodo)
    } catch (error) {
        res.status(400).json({msg:"No items found"})
    }
}

const createItems = async(req,res)=>{
    try {
        const createTodo = await Todo.create(req.body);
        res.status(200).json(createTodo)
    } catch (error) {
        res.status(400).json({msg:"No items found"})
    }
}


module.exports = { getAllItems, createItems }