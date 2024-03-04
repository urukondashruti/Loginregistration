const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'signupform',
});

connection.connect(function(err) {
  if (err) {
    console.log("Error connecting to MySQL database: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database with threadId: " + connection.threadId);
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO user VALUES (?, ?, ?)";
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  connection.query(sql, [name, email, password], (err, data) => {
    if (err) {
      console.error(err);
      return res.json("Error");
    }
    console.log(data);
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM user WHERE `email`=? AND `password`=?";
  const email = req.body.email;
  const password = req.body.password;

  connection.query(sql, [email, password], (err, data) => {
    if (err) {
      console.error(err);
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Failed");
    }
  });
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});