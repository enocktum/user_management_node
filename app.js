const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//parsing middleware
//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Parse application/json
app.use(bodyParser.json());

//static files like css,js,images etc
app.use(express.static('public'));

//Templating Engine
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

//Connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log("connection unsuccessful" + err);
        throw err;//connection not successful
    }
    else {
        console.log(`connection successful at ${connection.threadId}`);
    }
});

//handling routers
const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(port, () => console.log(`listening on port ${port}`));