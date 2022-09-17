// app.js file
var express= require('express'); 
var jsonServer = require('json-server');

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'waiterr',
  password: 'businessGenie9@gmail.com',
  database: 'waiterr'
})

connection.connect()
// Returns an Express server
var server = jsonServer.create();

// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults());

// Add custom routes
server.get('/custom', function (req, res) { 
  connection.query('SELECT * FROM USERDETAILS;', (err, rows, fields) => {
    if (err) throw err

    res.json(rows[0].json) 
  })
})




connection.end()


// Returns an Express router
// var router = jsonServer.router('db.json');

// server.use(router);

server.listen(3000);
