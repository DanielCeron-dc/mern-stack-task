const express = require('express'); 
const morgan = require('morgan');
const path = require('path'); 
const app = express(); 
const { mongoose } = require('./database');

//settings
app.set('port', process.env.PORT || 3000);

//midleware
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/tasks', require('./routes/task.routes.js'));

//Static files
app.use(express.static(path.join(__dirname, '../build'))); 
console.log('path = ' + path.join(__dirname, 'public'));


//starting the server
app.listen(app.get('port'), () => {
    console.log("server on port " + app.get('port'));
})
