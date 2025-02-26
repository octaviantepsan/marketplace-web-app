const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const routes = require('./routes/routes');

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

// for body parsing
app.use(express.json());

// routes and cors
app.use('/api', routes);
app.use(cors());

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});