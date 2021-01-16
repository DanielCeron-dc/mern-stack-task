const { json } = require('express');
const mongoose = require('mongoose');

const URI = 'mongodb://localhost/mern-task';

mongoose.connect(URI, { useNewUrlParser: true ,  useUnifiedTopology: true , useFindAndModify: false})
    .then(db => console.log('base de datos conectada :D' + db))
    .catch(err => console.error(err))

module.exports = mongoose; 
