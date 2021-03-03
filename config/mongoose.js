const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/BetterPlace');


const db = mongoose.connection;


db.on('error',console.error.bind(console,'Error connecting to DB'))

db.once('open',()=>{
    console.log('DB is connected to the server')
})

module.exports = db;