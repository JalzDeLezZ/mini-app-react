
const {config} = require('dotenv')
config()


module.exports = {
    db: {
        user:       process.env.DB_USER,
        password:   process.env.DB_PASSWORD,
        host:       process.env.DB_HOST,
        port:       process.env.DB_PORT,
        database:   process.env.DB_DATABASE
    }
}
/* 
user:       db.user,
password:   db.password,
host:       db.host,
port:       db.port,
database:   db.database, */