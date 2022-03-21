const express = require('express');
const morgan = require('morgan');
const cors = require("cors")


const taskRoutes = require('./routes/task.routes')


const app = express();
//MIDLEWARES
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(taskRoutes);

app.use((err,req,res,next) => {
    return res.json({
        message: err.message
    })
})

app.listen(4000)
console.log("server on port 4000")

/* 
  512  npm init -y
  513  npm i express morgan cors
  514  npm i nodemon -D
  519  npm i pg
  525  npm i dotenv
*/