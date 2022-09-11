// REQUERIMOS EL MODULO tasksController QUE CONTIENE LAS FUNCIONES CRUD
const tasksController = require('../controllers/tasksController');
// REQUERIMOS EXPRESS
const express = require('express');
// REQUERIMOS EXPRESS.ROUTER PARA HACER USO DE LOS METODOS HTTP 
const router = express.Router();

// Rutas Tasks
router.get("/all", tasksController.findAll);

router.get("/:id", tasksController.findById);

router.post("/add", tasksController.createTask);

router.put("/update/:id", tasksController.updateTask);

router.delete("/delete/:id", tasksController.deleteTask);


module.exports = router;