const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // Import CORS

const app = express();
const db = new sqlite3.Database(':memory:'); // In-memory database for simplicity

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a table for storing user data
db.serialize(() => {
    db.run(`
        CREATE TABLE user_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            gender TEXT,
            age INTEGER,
            weight REAL,
            height REAL,
            activity TEXT,
            goal TEXT,
            bmi REAL
        )
    `);
});

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const { gender, age, weight, height, activity, goal, bmi } = req.body;

    const query = `
        INSERT INTO user_data (gender, age, weight, height, activity, goal, bmi)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [gender, age, weight, height, activity, goal, bmi], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error saving data');
        }
        res.send('Data saved successfully');
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});