const mysql = require('mysql');
const router = require('../routes/user');

//Connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

//view users
exports.view = (req, res) => {
    //queries done here
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;//connection not successful
        }
        else {
            //connect to database
            connection.query('SELECT * FROM user WHERE state="active"', (err, rows) => {
                //when done with the connection you release
                connection.release();
                if (!err) {
                    //proceed with display of data
                    res.render('home', { rows });
                } else {
                    //report error if there
                    res.render('error');
                }
            });
        }
    });
    //end of queries
};

//find users by search
exports.find = (req, res) => {
    //queries done here
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;//connection not successful
        }
        else {
            let searchTerm = req.body.search;//This gets the posted document;
            //connect to database
            connection.query('SELECT * FROM user WHERE firstname LIKE ? OR lastname LIKE ? OR email LIKE ? OR phonenumber LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
                if (!err) {
                    //proceed with display of data
                    res.render('home', { rows });
                } else {
                    //report error if there
                    res.render('error');
                }

                //when done with the connection you release
                connection.release();
            });
        }
    });
    //end of queries
};

//add new user
exports.addForm = (req, res) => {
    res.render('adduser');
};

//posts user data to database
exports.postForm = (req, res) => {
    //get variables from form
    const { firstname, lastname, email, phonenumber, comments } = req.body;

    //user connection to server
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;//connection not successful
        }
        else {
            //connect to database
            connection.query('INSERT INTO user SET firstname=?,lastname=?,phonenumber=?,comments=?,email=?', [firstname, lastname, phonenumber, comments, email], (err, rows) => {
                if (!err) {
                    //proceed with display of data
                    res.render('adduser', { alert: `user ${firstname} ${lastname} has been successfully added to the system.` });
                } else {
                    //report error if there
                    res.render('error');
                }

                //when done with the connection you release
                connection.release();
            });
        }
    });
    //end of queries
};

//editing an existing user data to database
exports.postEditForm = (req, res) => {
    //get variables from form
    const { id } = req.body;
    if (id === "") {
        console.log("hakuna kitu imekwom");
    }
    else {
        //user connection to server
        pool.getConnection((err, connection) => {
            if (err) {
                throw err;//connection not successful
            }
            else {
                //connect to database
                connection.query('SELECT * FROM user WHERE id=?', [id], (err, rows) => {
                    if (!err) {
                        //proceed with display of data
                        res.render('edituser', { updatefields: `You are in the process of editing a user.`, userid: id, rows });
                    } else {
                        //report error if there
                        res.render('error');
                    }

                    //when done with the connection you release
                    connection.release();
                });
            }
        });
        //end of queries
    }

};

//updates user data to database
exports.postEditSuccess = (req, res) => {
    //get variables from form
    const { id, firstname, lastname, email, phonenumber, comments } = req.body;

    if (id === "") {
        console.log("The value of the id is not ready");
    }
    else {
        //user connection to server
        pool.getConnection((err, connection) => {
            if (err) {
                throw err;//connection not successful
            }
            else {
                //connect to database
                connection.query('UPDATE user SET firstname=?,lastname=?,phonenumber=?,comments=?,email=? WHERE id=?', [firstname, lastname, phonenumber, comments, email, id], (err, rows) => {
                    if (!err) {
                        //proceed with display of data
                        res.render('editusersuccess', { message: `user modification has been successful.` });
                    } else {
                        //report error if there
                        res.render('error');
                    }

                    //when done with the connection you release
                    connection.release();
                });
            }
        });
        //end of queries
    }
};

//deletes user data to database
exports.postDeleteSuccess = (req, res) => {
    //get variables from form
    const { id } = req.body;

    if (id === "") {
        console.log("The value of the id is empty");
        res.redirect("error");
    }
    else {
        //user connection to server
        pool.getConnection((err, connection) => {
            if (err) {
                throw err;//connection not successful
            }
            else {
                //connect to database
                connection.query('DELETE from user WHERE id=?', [id], (err, rows) => {
                    if (!err) {
                        //proceed with display of data
                        res.redirect('/');
                    } else {
                        //report error if there
                        res.render('error');
                    }

                    //when done with the connection you release
                    connection.release();
                });
            }
        });
        //end of queries
    }
};

//view users
exports.allInfo = (req, res) => {
    //queries done here
    const { id } = req.body;
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;//connection not successful
        }
        else {
            //connect to database
            connection.query('SELECT * FROM user WHERE id=?', [id], (err, rows) => {
                //when done with the connection you release
                connection.release();
                if (!err) {
                    //proceed with display of data
                    res.render('viewuser', { rows });
                } else {
                    //report error if there
                    res.render('error');
                }
            });
        }
    });
    //end of queries
};