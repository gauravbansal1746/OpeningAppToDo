const {Router} = require("express");
const { check, validationResult } = require('express-validator');
const { createTask, createSubTask, getTasks, getSubTasks, updateTask, updateSubTask, deleteTask, deleteSubTask } = require("../controller/ToDoController");

const router = Router()

router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

router.post("/subtasks", createSubTask);
router.get("/subtasks", getSubTasks);
router.put("/subtasks/:id", updateSubTask);
router.delete("/subtasks/:id", deleteSubTask);

router.post('/tasks', [
    check('title').isLength({ min: 5 }),
    check('description').isLength({ min: 5 }),
    // Add more validation checks as needed
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Continue with saving the task
});

router.get('/tasks', [
    check('title').isLength({ min: 5 }),
    check('description').isLength({ min: 5 }),
    // Add more validation checks as needed
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Continue with saving the task
});

module.exports = router;
