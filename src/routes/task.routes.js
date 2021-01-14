const express = require('express');
const task = require('../models/task');
const router = express.Router();



router.get('/', async (req, res) => {
    const tasks = await task.find(); 
    console.log(tasks);
    res.json('received'); 
});


module.exports = router; 