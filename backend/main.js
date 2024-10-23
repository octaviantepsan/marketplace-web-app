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
    // ------------------------------------------------------
        //USER FUNCTIONS
    // ------------------------------------------------------

function processUserData(firstName, lastName, city, adress) {
    let letterOnlyCheck = /^[a-zA-Z]+$/;

    if ((typeof (firstName) != 'string') || (typeof (lastName) != 'string') || (typeof (city) != 'string') || (typeof (adress) != 'string')) {
        return false;
    }

    if (letterOnlyCheck.test(firstName) && letterOnlyCheck.test(lastName) && letterOnlyCheck.test(city)) {
        return true;
    }
        
    return false;
}

function deleteUser(userId) {
    const query = `DELETE FROM Users WHERE UserId = ${userId}`;
    console.log("User has been deleted.");
}

function testInsertUser(firstName, lastName, city, adress) {
    if (processUserData(firstName, lastName, city, adress) === false) {
        console.error("Data was processed incorrectly");
        return;
    }

    const query = `INSERT INTO Users (LastName, FirstName, City, Address)
                   VALUES ('${lastName}', '${firstName}', '${city}', '${adress}')`;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err.message);
        }
        console.log(results);
    });
}
    // ------------------------------------------------------
        //ITEM FUNCTIONS
    // ------------------------------------------------------

function processItemData(itemName, itemType, stock = 0) {
    let letterOnlyCheck = /^[a-zA-Z]+$/;

    if ((typeof (itemName) != 'string') || (typeof (itemType) != 'string') || (typeof (stock) != 'number')) {
        return false;
    }

    if (letterOnlyCheck.test(itemType) && stock >= 0) {
        return true;
    }
        
    return false;
}

function deleteItem(itemId) {
    const query = `DELETE FROM Items WHERE ItemId = ${itemId}`;
    console.log("Item has been deleted.");
}

function testInsertItem(itemName, itemType, stock, userId) {
    if (processItemData(itemName, itemType, stock) === false) {
        console.error("Data was processed incorrectly");
        return;
    }

    const query = `INSERT INTO Items (ItemName, ItemType, Stock, UserId)
                   VALUES ('${itemName}', '${itemType}', '${stock}', ${userId})`;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err.message);
        }
        console.log(results);
    });
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});