const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

const frontendURL = 'http://localhost:4200';
const allowCORS = 'Access-Control-Allow-Origin';

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "magazin",
    port: 3306
});

const utils = require('../utils/utils');

module.exports = router;

// exemple ... 

// Get method
router.get('/getUsers', async (req, res) => {
    res.set(allowCORS, frontendURL);
    console.log("Received GET request to ['/getUsers'] ... ");
    try {
        const query = `SELECT * FROM users`;
        db.query(query, (err, results) => {
            if (err) {
                console.error(err.message);
            }
            res.json(results);
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Post method
router.post('/postUser', async (req, res) => {
    res.set(allowCORS, frontendURL);
    console.log("Received POST request to ['/postUser'] ... ");
    try {
        const query = `INSERT INTO Users (LastName, FirstName, City, Address)
                   VALUES ('${req.body.lastName}', '${req.body.firstName}', '${req.body.city}', '${req.body.adress}')`;
        db.query(query, (err) => {
            if (err) {
                console.error(err.message);
            }
            res.status(200).json({ message: "post ok" });
        });
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});
