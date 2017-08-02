const express = require('express');
const pg = require('pg');
const config = require('./config');
const av_loader = require('./services/av_loader');
const constants = require('./constants');

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

function updateEntry(company, res) {
    //console.log(company);
    //console.log(res);
    client.query('UPDATE stockdata SET current_price=' + 
        res.currentPrice.toFixed(2).toString() + 
        ', mavg50=' + (res.mavg50 === undefined ? 0: res.mavg50).toString() + 
        ', mavg100=' + (res.mavg100 === undefined ? 0: res.mavg100).toString() +
        ', mavg200=' + (res.mavg200 === undefined ? 0: res.mavg200).toString() + 
        ', month3vol=' + res.threeMVol.toString() + 
        ', day10vol=' + res.tenDayVol.toString() +
        ', percentchange5d=' + res.percentChange5D + 
        ' WHERE symbol=\'' + company + '\'', 
    (err, res) => {
        if (err) console.log(err);
    })
}

function updateFailureHandle() {
    console.log("An error while trying to access AlphaVantage");
}

/**
 * Updates database
 */
function updateDB() {
    console.log("Updating...");
    for (let i = 0; i < constants.companies.length; i++) {
        av_loader.avCall(constants.companies[i], updateEntry, updateFailureHandle); //TO BE CHANGED
    }
}

//Setup
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

updateDB();

setInterval(updateDB, 30000);

app.use(express.static(__dirname + '/dist'));
app.listen(process.env.PORT || 8080);
console.log("connected");