const express = require('express');
const pg = require('pg');
const config = require('./config');
//const av_loader = require('./services/av_loader');

const app = express();

var client = new pg.Client(process.env.DATABASE_URL || config.conString);
client.connect((err) => {  
    if (err) console.log(err);
});

/*client.query('SELECT * FROM testdata', (err, res) => {
    console.log(err, res);
    console.log(res.rows[0].name);
    client.end();
}); */



app.get('/api/sanitycheck', function(req, res) {
    res.json({
        message: "Hello, API!"
    });
});

app.get('/api/stockdata', function(req, response){
    client.query('SELECT * FROM stockdata', (err, res) => {
        if (err) {
            console.log("An error occured while querying the db");
            response.json({error: "Database Error"});
        }
        else{
            response.json(res.rows);
        }
    });
});

app.use(express.static(__dirname + '/dist'));
app.listen(process.env.PORT || 8080);
console.log("connected");