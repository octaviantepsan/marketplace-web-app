const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "magazin",
    port: 3306
});

// Test the database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to MySQL database!');
    connection.release(); // Release the connection back to the pool
});

function queryDb() {
    const query = 'SELECT * FROM users';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err.message);
        }
        console.log(results);
    });
}

function testInsertUser(firstName, lastName, city, adress) {
    const query = `INSERT INTO Users (LastName, FirstName, City, Address, DateCreated, IsVendor, Rating, Sales) 
                   VALUES ('Tepsan', 'Dan', 'Bucuresti', 'Mare', '2024-10-11', 1, 0, 0)`;

    if(processUserData(firstName, lastName, city, adress) === false) {
        console.log("Data was processed incorrectly");
        return;
    }
    
    db.query(query, (err, results) => {
        if (err) {
            console.error(err.message);
        }
        console.log(results);
    });
}

function processUserData(firstName, lastName, city, adress) {
    let letterOnlyCheck = /^[a-zA-Z]+$/;

    if ((typeof (firstName) === 'string') && (typeof (lastName) === 'string') && (typeof (city) === 'string') && (typeof (adress) === 'string')) {
        if (letterOnlyCheck.test(firstName) && letterOnlyCheck.test(lastName) && letterOnlyCheck.test(city))
            return true;
    }

    return false;
}

function processItemData(itemName, itemType, stock) {
    let letterOnlyCheck = /^[a-zA-Z]+$/;

    if ((typeof (itemName) === 'string') && (typeof (itemType) === 'string') && (typeof (stock) === 'number')) {
        if (letterOnlyCheck.test(itemType))
            return true;
    }

    return false;
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//queryDb();
testInsertUser();