'use strict'

const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const userModel = require('../models/users');


router.get('/', (req, res) => {
    res.redirect('/users/login');
});


router.get("/login", (req, res) => {
    res.render("template", {
        locals: {
        title: "Login Page",
        is_logged_in: req.session.is_logged_in,
        },
        partials: {
        partial: "partial_login",
        },
    });
});


router.get("/signup", (req, res) => {
    res.render("template", {
        locals: {
        title: "Sign Up Page",
        is_logged_in: req.session.is_logged_in,
        },
        partials: {
        partial: "partial_Signup",
        },
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)

    const userInstance = new userModel(null, name, email, hash);

    userInstance.save().then(response => {
        if(response.id !== undefined) {
            res.redirect('/users/login');
        } else {
            res.redirect('/users/signup');
        }
        res.sendStatus(200);
    })
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const userInstance = new userModel(null, null, email, password);
    userInstance.login().then(response => {
        req.session.is_logged_in = response.isValid;
        if (!!response.isValid) {
            const { name, user_id } = response;
            req.session.name = name;
            req.session.user_id  = user_id;
            res.redirect('/')
        } else {
            res.sendStatus(401);
        }
    })
});

module.exports = router;