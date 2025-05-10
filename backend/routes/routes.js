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

router.post('/registerUser', async (req, res) => {
    res.set(allowCORS, frontendURL);
    console.log("Received POST request to ['/registerUser'] ... ");

    if (utils.isUserDataValid(req.body.email, req.body.fname, req.body.lname, req.body.city) === true) {
        const query = `INSERT INTO Users (Email, Passw, LastName, FirstName, City, Address)
                       VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [req.body.email, req.body.passw, req.body.lname, req.body.fname, req.body.city, req.body.adress];

        db.query(query, values, (err, results) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ message: err.message });
            }
            newUserId = results.insertId
            res.status(200).json({ userId: newUserId });
        });
    }
    else {
        res.status(400).json({});
    }
});

router.post('/loginUser', async (req, res) => {
    res.set(allowCORS, frontendURL);
    console.log("Received POST request to ['/loginUser'] ... ");

    const query = `SELECT * FROM Users WHERE Email = ? AND Passw = ?`;
    const values = [req.body.email, req.body.passw];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: err.message });
        }

        if (results.length > 0) {
            res.status(200).json({ userId: results[0].UserId });
        }
        else {
            res.status(400).json({ message: "User not found" });
        }
    });
});

router.post('/addItem', async (req, res) => {
    res.set(allowCORS, frontendURL);
    console.log("Received POST request to ['/addItem'] ... ");

    if (utils.processItemData(req.body.iname, req.body.itype, req.body.stock) === true) {
        const query = `INSERT INTO Items (ItemName, ItemType, Stock, VendorId)
                       VALUES (?, ?, ?, ?)
                       ON DUPLICATE KEY UPDATE Stock = Stock + VALUES(Stock)`;
        const values = [req.body.iname, req.body.itype, req.body.stock, req.body.userId];

        db.query(query, values, (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ message: err.message });
            }
            res.status(200).json({ message: "added item succesfully" });
        });
    }
    else {
        res.status(400).json({});
    }
});

router.get('/getUserData', async (req, res) => {
    res.set(allowCORS, frontendURL);
    console.log("Received GET request to ['/getUsers'] ... ");

    const query = `SELECT * FROM Users WHERE UserId = ?`;
    const values = [req.query.userId];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: err.message });
        }

        if (results.length > 0) {
            res.status(200).json(results[0]);
        }
        else {
            res.status(400).json({ message: "User not found" });
        }
    });
});