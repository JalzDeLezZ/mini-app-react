const pool = require('../db')

const getDefault =  async (req, res) => {
    const {title, description} = req.body;
    console.log(title, description);

    const result = await pool.query('SELECT NOW()')
    console.log(result)
    res.json(result.rows[0].now)
}

const getTaskById = async (req, res) => {
    try {
        const {identity} = req.params 
        console.log(identity)
        
        const result = await pool.query('SELECT * FROM task WHERE id = $1',[identity])
        console.log(result)

        if(result.rows.length === 0){
            return res.status(404).json({message: "Task not found"})
        }

        // res.json({Sussesfully: result.rows})
        res.json(result.rows[0])
    } catch (error) { res.json({error: error.message}) }

}

const getAllTask = async (req, res, next) => {

    try {
        
        // throw new Error('ALGO FUE MAL');

        const allTask = await  pool.query('SELECT * FROM task')
    
        console.log(allTask)
    
        res.send(allTask.rows)

    // } catch (error) { res.json({error: error.message}) }
    } catch (error) {
         next(error) 
    }
}

const createTask = async (req, res) => {
    const {title, description} = req.body;
    
    try {
        const result = await pool.query('INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *', [
            title,
            description
        ])
        console.log(result)
        res.json(result.rows[0])
    } catch (error) {
        console.log(error.message)
        res.json({error: error.message})
    }

}

const deleteTask = async (req, res, next) => {

    try {
        const {identity} = req.params 

        const result = await pool.query('DELETE FROM task WHERE id = $1 RETURNING *', [identity])
        console.log(result)


        if(result.rowCount === 0){
            return res.status(404).json({message: "Task not found"})
        }
        return res.sendStatus(204);

    } catch (error) {
        next(error)
    }

}

const updateTask = async (req, res, next) => {
    try {
        const {identity} = req.params
        const {title, description} = req.body;

        console.log(identity, title, description)

        const result = await pool.query("UPDATE task SET title = $1 , description = $2 WHERE id = $3 RETURNING *", [title, description, identity]
        );
        console.log(result)

        if(result.rows.length === 0){
            return res.status(404).json({ message: "Task not found" })
        }
        return res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getDefault
    ,getTaskById
    ,getAllTask
    ,createTask
    ,deleteTask
    ,updateTask
}