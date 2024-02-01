const { Task, SubTask } = require("../models/ToDoModels");
const authenticateToken = require('../authMiddleware');

const jwt = require('jsonwebtoken');

// Create a new task

module.exports.createTask = async (req, res) => {
    try {
        const { title, description, due_date } = req.body;
        
        // Get the authorization header
        const authHeader = req.headers['authorization'];

        // Check if the authorization header is present
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization token is missing' });
        }

        // Extract the token from the authorization header
        const token = authHeader.split(' ')[1];

        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            // You can access user information from decoded data if needed
            // const userId = decoded.id;

            // Create and save the task
            const newTask = new Task({ title, description, due_date, user_id: decoded.id });
            const savedTask = await newTask.save();
        }
            catch(err){
            console.error(err);
            return res.status(403).json({ message: 'Invalid token' });
          res.status(201).send(savedTask);
            }
    
    } 
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};


// Create a new subtask
module.exports.createSubTask = async (req, res) => {
    try {
        const { task_id } = req.body;

        const newSubTask = new SubTask({ task_id });
        const savedSubTask = await newSubTask.save();

        res.status(201).send(savedSubTask);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Get all tasks for a user
module.exports.getTasks = async (req, res) => {
    try {
        const { priority, due_date } = req.query;
        let filter = {};

        if (priority==1) {
            filter.priority = priority;
        }

        if (due_date){
            filter.due_date = { $gte: new Date(due_date) };
        }
       

        const tasks = await Task.find(filter);
        res.send(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Get all subtasks for a task
module.exports.getSubTasks = async (req, res) => {
    try {
        const { task_id } = req.query;
        let filter = {};

        if (task_id) {
            filter.task_id = task_id;
        }

        const subTasks = await SubTask.find(filter);
        res.send(subTasks);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Update a task
module.exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { due_date, status } = req.body;

        const task = await Task.findById(id);
        if (due_date) task.due_date = due_date;
        if (status) task.status = status;
        await task.save();

        res.send("Updated Successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Update a subtask
module.exports.updateSubTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const subTask = await SubTask.findById(id);
        if (status) subTask.status = status;
        await subTask.save();

        res.send("Updated Successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Delete a task (soft deletion)
module.exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);
        task.deleted_at = new Date();
        await task.save();

        res.send("Deleted Successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

// Delete a subtask (soft deletion)
module.exports.deleteSubTask = async (req, res) => {
    try {
        const { id } = req.params;

        const subTask = await SubTask.findById(id);
        subTask.deleted_at = new Date();
        await subTask.save();

        res.send("Deleted Successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};


module.exports.saveTask = async (req, res) => {
    try {
        const { title, description, due_date, priority, status } = req.body;

        const newTask = new Task({ title, description, due_date, priority, status });
        const savedTask = await newTask.save();

        console.log("Saved Successfully...");
        res.status(201).send(savedTask);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.updateTask = (req,res) => {
    const {id} = req.params
    const { title, description, due_date, priority, status } = req.body

    Task.findByIdAndUpdate(id, { title, description, due_date, priority, status }).then(()=>{
        res.send("Updated Succesfully...");
    })
    .catch((err)=> {
        console.log(err);
        res.send({error:err,msg:"Something went wrong!"});
    });
};

module.exports.deleteTask = (req,res) => {
    const {id} = req.params

    Task.findByIdAndDelete(id).then(()=>{
        res.send("Deleted Succesfully...");
    })
    .catch((err)=> {
        console.log(err);
        res.send({error:err,msg:"Something went wrong!"});
    });
};

module.exports.getSubTasks = async (req, res) => {
    try {
        const subTasks = await SubTask.find();
        res.send(subTasks);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports.saveSubTask = async (req, res) => {
    try {
        const { task_id, status } = req.body;

        const newSubTask = new SubTask({ task_id, status });
        const savedSubTask = await newSubTask.save();

        console.log("Saved Successfully...");
        res.status(201).send(savedSubTask);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.updateSubTask = (req,res) => {
    const {id} = req.params
    const { status } = req.body

    SubTask.findByIdAndUpdate(id, { status }).then(()=>{
        res.send("Updated Succesfully...");
    })
    .catch((err)=> {
        console.log(err);
        res.send({error:err,msg:"Something went wrong!"});
    });
};

module.exports.deleteSubTask = (req,res) => {
    const {id} = req.params

    SubTask.findByIdAndDelete(id).then(()=>{
        res.send("Deleted Succesfully...");
    })
    .catch((err)=> {
        console.log(err);
        res.send({error:err,msg:"Something went wrong!"});
    });
};
