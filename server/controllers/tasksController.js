// REQUIERE MONGOOSE PARA USAR SUS METODOS COMO FIND POR EJEMPLO (OBTENER) 
const mongoose = require('mongoose');
// REQUIERE EL MODELO 
const Task = require('../models/tasksModel');
// A CONTINUACION; TODOS LOS METODOS PARA EL CRUD


// ENCONTRAR TODAS LAS TAREAS (.Find)
const findAll = (req,res)=>{

    Task.find((err,tasks)=>{

        // status 500 si hay un error y si no un 200 con el json
        err && res.send(500).send(err.message);

        res.status(200).json(tasks);
    })
}

// ENCONTRAR TAREA POR SU ID (.FindById)
const findById = (req,res)=>{

    Task.findById(req.params.id, (err,task)=>{

        // status 500 si hay un error y si no un 200 con el json
        err && res.status(500).send(err.message);

        res.status(200).json(task)

    })

}

// CREAR NUEVA TAREA (.SAVE)
const createTask = (req,res)=>{

    let TaskNew = new Task({
        idtask: req.body.idtask,
        titulo: req.body.titulo,
        estado: req.body.estado
    })

    TaskNew.save((err,taskNew)=>{

        // status 500 si hay un error y si no un 200 con el json
        err && res.status(500).send(err.message);

        res.status(200).json(taskNew)

    })
}

// ACTUALIZAR TAREA POR SU ID (.findOneAndUpdate)
const updateTask = (req,res)=>{

    Task.findOneAndUpdate({_id:req.params.id},{
        $set:{
            idtask: req.body.idtask,
            titulo: req.body.titulo,
            estado: req.body.estado
        }
    })

    // status 500 si hay un error y si no un 200 con el json
    .then(result=>{
        res.status(200).json({
            updated_Task:result
        })
    })
    
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}

// ELIMINAR TAREA POR SU ID (.deleteOne)
const deleteTask = (req,res)=>{
    
    Task.deleteOne({_id:req.params.id})

    // status 500 si hay un error y si no un 200 con el json
    .then(result=>{
        res.status(200).json({
            message: 'Task Deleted',
            result: result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        })
    })
}



module.exports = { findAll, findById, createTask, updateTask, deleteTask};