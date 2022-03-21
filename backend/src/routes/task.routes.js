const {Router} = require('express');
const { getDefault, getTaskById, getAllTask, createTask, deleteTask, updateTask } = require('../controllers/task.controllers');

const pool = require('../db')

const router = Router();

router.get('/', getDefault)

router.get('/tasks/:identity', getTaskById)

router.get('/tasks', getAllTask)

router.post('/tasks', createTask)

router.delete('/tasks/:identity', deleteTask)


router.put('/tasks/:identity', updateTask)


module.exports = router;
