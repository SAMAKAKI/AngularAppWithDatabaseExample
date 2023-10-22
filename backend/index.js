// include packages

const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

// set parameters

app.use(cors());
app.use(bodyparser.json());

// databse connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'angularappwithdatabaseexample',
    port: 3306
});

// check database connection

db.connect((err) => {
    if(err){
        console.log('err' + err);
        return;
    }
    console.log('database connected...');
});

// get all data from database

app.get('/api/item', (req, res) => {
    let  query = 'SELECT * FROM items';
    db.query(query, (err, result) => {
        if(err){
            console.log('err' + err);
        }
        if(result.length > 0){
            res.send({
                message: 'all item data',
                data: result
            });
        }
    });
});

// get single data from database

app.get('/api/item/:id', (req , res) => {
    let getId = req.params.id;
    let query = `SELECT * FROM items WHERE id = ${getId}`;
    db.query(query, (err, result) => {
        if(err){
            console.log('err' + err);
        }
        if(result.length > 0){
            res.send({
                message: 'get single data',
                data: result
            });
        } else{
            res.send({
                message: 'data not found'
            });
        }
    });
});

// post data to databse

app.post('/api/item', (req, res) => {
    console.log(req.body, 'createdata');

    let name = req.body.name;
    let description = req.body.description;
    let dateCreation = req.body.dateCreation;

    let query = `INSERT INTO items(id, name, description, dateCreation) VALUES (NULL, '${name}', '${description}', '${dateCreation}')`;
    db.query(query, (err, result) => {
        if(err){
            console.log('err' + err);
        }
        if(result){
            res.send({
                message: 'data created'
            });
        } else{
            res.send({
                message: 'wrong...'
            });
        }
    });
});

// update single data

app.put('/api/item/:id', (req, res) => {
    console.log(req.body, 'updatedata');

    let getId = req.params.id;

    let name = req.body.name;
    let description = req.body.description;
    let dateCreation = req.body.dateCreation;

    let query = `UPDATE items SET name='${name}',description='${description}',dateCreation='${dateCreation}' WHERE id=${getId}`;

    db.query(query, (err, result) => {
        if(err){
            console.log('err' + err);
        }
        if(result){
            res.send({
                message: 'data updated'
            });
        } else{
            res.send({
                message: 'wrong...'
            });
        }
    });
});

// delete single data

app.delete('/api/item/:id', (req, res) => {
    console.log(req.body, 'deletedata');

    let getId = req.params.id;

    let query = `DELETE FROM items WHERE id=${getId}`;

    db.query(query, (err, result) => {
        if(err){
            console.log('err' + err);
        }
        if(result){
            res.send({
                message: 'data deleted'
            });
        } else{
            res.send({
                message: 'wrong...'
            });
        }
    });
});

// run server

app.listen(3000, () => {
    console.log('server running...');
});
