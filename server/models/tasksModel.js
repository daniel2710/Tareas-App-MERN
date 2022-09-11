const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    idtask: { type: Number },
    titulo: { type: String },
    estado: { type: String }
});

module.exports = TaskModel = mongoose.model('Tasks', TaskSchema);