'use strict'

const express = require('express');
const db = require('../models/conn');
const tasksList = require('../models/tasks'),
    router = express.Router();



router.get('/', async (req, res) => {
    const tasks = await tasksList.getAll();
    res.render('template', {
        locals: {
            title: 'To_Do_List',
            data: tasksList,
            is_logged_in: req.session.is_logged_in,
        },
        partials: {
            partial: 'partial_tasks'
        }
    });
});

module.exports = router;