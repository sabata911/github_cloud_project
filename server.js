const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test',
  password: 'Admin123!'
});



// Define a route to retrieve all users
app.get('/all', (req, res) => {
  // Select all users from the MySQL database
  const query = 'SELECT * FROM users';
  connection.query(
    'SELECT * FROM `user`',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
      res.status(200).json(results);
    }
  ) 
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // Replace 'index.html' with your actual HTML file path
});

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});


app.post('/add', (req, res) => {
  const { name, surname, email, password } = req.query;

  connection.query('INSERT INTO user (name, surname, email, password) VALUES (?,?,?,?)', [name, surname, email, password],(error, results) => {
     if (error) return res.json({ error: error });

     });

 
});