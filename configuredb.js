const pg = require('pg');
const config = require('./config');
const constants = require('./constants');


var client = new pg.Client(process.env.DATABASE_URL || config.conString);
client.connect((err) => {  
    if (err) console.log(err);
});

/*client.query('CREATE TABLE stockdata (symbol varchar(6), current_price real, mavg50 real, mavg100 real, mavg200 real, month3vol real, day10vol real, percentChange5D real)', 
        (err, res) => {
            if(err) console.log(err);
            else {
                for (let i = 0; i < constants.companies.length; i++) {
                    client.query('INSERT INTO stockdata (symbol, current_price, mavg50, mavg100, mavg200, month3vol, day10vol, percentChange5D) VALUES (\'' + constants.companies[i] + '\', 0, 0, 0, 0, 0, 0, 0)', //
                        (err, res) => {
                            if(err) console.log(err);
                    });
                }
            }
        }); 

/*for (let i = 0; i < constants.companies.length; i++) {
    client.query('INSERT INTO stockdata (symbol varchar(4), current_price real, mavg50 real, mavg100 real, mavg200 real, month3vol real, day10vol real, percentChange5D real) VALUES (' + constants.companies[i] + ', 0, 0, 0, 0, 0, 0, 0)', 
        (err, res) => {
            if(err) console.log(err);
        }).on('end');
} */
client.query('CREATE TABLE stockdata (symbol varchar(6), current_price real, '+
    'mavg50 real, mavg100 real, mavg200 real, month3vol real, day10vol real, ' + 
    'percentChange5D real, percentOfIndex real, sector varchar(4), ranges real[30], gapPresent boolean, ' + 
    'pivotAvg real, stdVolatility real)', 
        (err, res) => {
            if(err) console.log(err);
            else {
                for (let i = 0; i < constants.allCompanies.length; i++) {
                    //console.log("Company is " + constants.allCompanies[i]);
                    //console.log("Sector is " + constants.sectorLookup[constants.allCompanies[i]]);
                    client.query('INSERT INTO stockdata (symbol, current_price, '+
                    'mavg50, mavg100, mavg200, month3vol, day10vol, percentChange5D, '+
                    'percentOfIndex, sector, ranges, gapPresent, pivotAvg, ' + 
                    'stdVolatility) VALUES (\'' + 
                    constants.allCompanies[i] + '\', 0, 0, 0, 0, 0, 0, 0, 0, \'' +
                    constants.sectorLookup[constants.allCompanies[i]] + 
                    '\', ARRAY[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], FALSE, 0, 0)',
                    (err, res) => {
                        if (err) {
                            console.log(err);
                            //console.log("error occured");
                        }
                    });
                }
            }
        }
)