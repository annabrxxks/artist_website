const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import the cors middleware
const app = express();
const port = 8800;

app.use(cors({
    origin: ['http://localhost:8080'],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true, // enable set cookie with credentials (e.g., for sessions)
}));

const connection = mysql.createConnection({
  host: 'sql5.freemysqlhosting.net',
  user: 'sql5678662',
  password: 'wAzjvsVhcj',
  database: 'sql5678662'
});

connection.connect();

app.get('/data', (req, res) => {
  const query = 'SELECT * FROM events';
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json(results);
    }
  });
});

app.post('/addEvent', (req, res) => {
  const query = `INSERT INTO events('name', 'date', 'time', 'address', 'google_maps', 'desc') VALUES (?)`;
  const values = [
    req.body.name,
    req.body.date,
    req.body.time,
    req.body.address,
    req.body.google_maps,
    req.body.desc
  ];
  connection.query(query, [values], (error, results) => {
    if (error) {
        res.status(500).send(error.message);
    } else {
        // Fetch the updated events data and send it as a response
        fetchEventsData((data) => {
            res.json({ message: 'Event added successfully', events: data });
        });
    }
  });
});

// Helper function to fetch events data
function fetchEventsData(callback) {
  // Perform a query to get the events data from the database
  const query = 'SELECT * FROM events';
  connection.query(query, (error, results) => {
      if (error) {
          console.error('Error fetching events data:', error);
          callback([]);
      } else {
          callback(results);
      }
  });
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});