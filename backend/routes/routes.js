const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

const frontendURL = 'http://localhost:4200';
const allowCORS = 'Access-Control-Allow-Origin';

const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration 
cloudinary.config({
    cloud_name: "di2n1y2e6",
    api_key: "842555218398851",
    api_secret: "fTOsYEEWukHpEyblxSIPKpseCU8"
});

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "magazin",
    port: 3306
});

const utils = require('../utils/utils');

module.exports = router;

router.post('/registerUser', async (req, res) => {
    res.set(allowCORS, frontendURL);

    if (utils.isUserDataValid(req.body.email, req.body.fname, req.body.lname, req.body.city) === true) {
        const query = `INSERT INTO Users (Email, Passw, LastName, FirstName, City, Address)
                       VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [req.body.email, req.body.passw, req.body.lname, req.body.fname, req.body.city, req.body.adress];

        db.query(query, values, (err, results) => {
            if (err) {
                res.status(500).json({});
                return;
            }
            newUserId = results.insertId
            res.status(200).json({ userId: newUserId, isVendor: req.body.vendor });
        });
    }
    else {
        res.status(400).json({ message: "Data is incorrect" });
    }
});

router.post('/loginUser', async (req, res) => {
    res.set(allowCORS, frontendURL);

    const query = `SELECT * FROM Users WHERE Email = ? AND Passw = ?`;
    const values = [req.body.email, req.body.passw];

    db.query(query, values, (err, results) => {
        if (err) {
            res.status(500).json({ message: err.message });
        }

        if (results.length > 0) {
            res.status(200).json({ userId: results[0].UserId, isVendor: results[0].IsVendor });
        }
        else {
            res.status(400).json({ message: "User not found" });
        }
    });
});

router.post('/addItem', async (req, res) => {
    res.set(allowCORS, frontendURL);

    if (utils.processItemData(req.body.iname, req.body.categ, req.body.price) == true) {
        try {
            const upload = cloudinary.uploader.upload(
                req.body.image,
                {
                    public_id: req.body.image.slice(-10),
                    folder: "octav-marketplace"
                });
            let secureUrl = '';
            upload.then(async (cloudinaryData) => {
                secureUrl = cloudinaryData.secure_url;
                const query = `INSERT INTO Items (ItemName, Category, Price, VendorId, Image, Description)
                       VALUES (?, ?, ?, ?, ?, ?)`
                const values = [req.body.iname, req.body.categ, req.body.price, req.body.userId, secureUrl, req.body.desc];
                db.query(query, values, (err) => {
                    if (err) {
                        console.error(err.message);
                        res.status(500).json({ message: err.message });
                        return;
                    }
                    res.status(200).json({ message: "added item succesfully" });
                });
            })
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }
    else {
        res.status(400).json({});
    }
});

router.get('/getUserData', async (req, res) => {
    res.set(allowCORS, frontendURL);

    const query = `SELECT * FROM Users WHERE UserId = ?`;
    const values = [req.query.userId];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: err.message });
            return;
        }

        if (results.length > 0) {
            res.status(200).json(results[0]);
        }
        else {
            res.status(400).json({ message: "User not found" });
        }
    });
});

router.get('/getProducts', async (req, res) => {
    res.set(allowCORS, frontendURL);

    const isQuery = req.query && req.query.userId;

    const query = isQuery ? `SELECT * FROM Items WHERE VendorId = ?` : `Select * FROM Items`;
    const values = isQuery ? [req.query.userId] : [];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: err.message });
            return;
        }
        else {
            res.status(200).json(results);
        }

    });
});

router.get('/getProductsForBuyer', async (req, res) => {
    res.set(allowCORS, frontendURL);

    const query =
        `
        SELECT I.ItemName, I.Category, I.Price, I.Availability, I.Status, I.BuyTimestamp, I.VendorId, I.Image, I.Description
        FROM Items AS I
        INNER JOIN Transactions as T ON T.ItemId = I.ItemId
        WHERE T.BuyerId = ?
    `;
    const values = [req.query.userId];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: err.message });
            return;
        }

        if (results.length > 0) {
            res.status(200).json(results);
        }
        else {
            res.status(400).json({ message: "Items not found" });
        }
    });
});

router.get('/getVendorName', async (req, res) => {
    res.set(allowCORS, frontendURL);

    const query = `SELECT LastName, FirstName FROM Users WHERE UserId = ?`;
    const values = [req.query.vendorId];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: err.message });
            return;
        }

        if (results.length > 0) {
            res.status(200).json(results[0]);
        }
        else {
            res.status(400).json({ message: "Vendor not found" });
        }
    });
});

router.post('/updateItemStatus', async (req, res) => {
    res.set(allowCORS, frontendURL);

    const query = `UPDATE Items SET Status = ?, Availability = ?, BuyTimestamp = NOW() WHERE ItemId = ?`;
    const values = [req.body.status, req.body.availability, req.body.itemId];

    db.query(query, values, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: err.message });
            return;
        }
        res.status(200).json({});
    });
});

router.post('/updateDeliveryStatus', async (req, res) => {
    res.set(allowCORS, frontendURL);

    const query = `UPDATE Items SET Status = ? WHERE ItemId = ?`;
    const values = [req.body.status, req.body.itemId];

    db.query(query, values, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: err.message });
            return;
        }
        res.status(200).json({});
    });
});

router.post('/createTransaction', async (req, res) => {
    res.set(allowCORS, frontendURL);

    if (req.body.vendorId != req.body.buyerId) {
        const query = `INSERT INTO Transactions (ItemId, VendorId, BuyerId, Deadline)
                VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL 3 DAY))`;
        const values = [req.body.itemId, req.body.vendorId, req.body.buyerId];

        db.query(query, values, (err) => {
            if (err) {
                console.error(err.message);
                res.status(500).json({ message: err.message });
                return;
            }
            res.status(200).json({});
        });
    }
    else {
        res.status(400).json({});
    }
});

router.post('/getPurchaseInfo', async (req, res) => {
    res.set(allowCORS, frontendURL);

    const query =
        `
        SELECT U.LastName, U.FirstName, U.Address, U.Email, I.BuyTimestamp
        FROM (Transactions AS T
        INNER JOIN Items AS I ON T.ItemId = I.ItemId)
        INNER JOIN Users AS U ON U.UserId = T.BuyerId
        WHERE T.VendorId = ? AND T.ItemId = ? 
    `;
    const values = [req.body.userId, req.body.itemId];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: err.message });
            return;
        }
        res.status(200).json(results[0]);
    });
});

router.get('/getProductsForNotif', async (req, res) => {
    res.set(allowCORS, frontendURL);

    const isQuery = req.query && req.query.userId;  // check if a query was sent

    const query = `SELECT VendorId, Status FROM Items WHERE VendorId = ?`;
    const values = [req.query.userId];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: err.message });
            return;
        }
        else {
            res.status(200).json(results);
        }
    });
});