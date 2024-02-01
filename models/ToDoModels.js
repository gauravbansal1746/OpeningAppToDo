const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    due_date: { type: Date, required: true },
    priority: { type: Number, required: true },
    status: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
    deleted_at: { type: Date }
});

const SubTaskSchema = new Schema({
    task_id: { type: Schema.Types.ObjectId, ref: 'Task' },
    status: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date },
    deleted_at: { type: Date }
});

const Task = mongoose.model('Task', TaskSchema);
const SubTask = mongoose.model('SubTask', SubTaskSchema);

module.exports = { Task, SubTask };
