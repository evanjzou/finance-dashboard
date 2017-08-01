/**
 * This module loads data from alphavantage
 */

const https = require('https');

const TIME_SERIES_BASE_URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=';
const TIME_SERIES_URL_TAIL = '&outputsize=full&apikey=U8DGBF2PDMXR2FZT';
const TIME_SERIES_URL_TAIL_SHORT = '&apikey=U8DGBF2PDMXR2FZT';

/**
 * TODO
 */
exports.avCallDailySeries = function(company) {
    return;
}

function getNextDayBack(res) {
    let today = (new Date()).toISOString().substring(0, 10);
}

/**
 * Runs callback on the JSON output from an https daily series call to
 * AlphaVantage
 * @param {string} [company] the stock ticker of the company (e.g 'GOOG')
 * @param {function} [callback] the callback to run on the resultant JSON
 * @param {function} [onError] the callback to run when an error occurs
 */
function avCall(company, callback, onError) {
    https.get(TIME_SERIES_BASE_URL + company + TIME_SERIES_URL_TAIL, (res) => {
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function() {
            var response = JSON.parse(body);
            //console.log(response);
            callback(response);
        });
    }).on('error', onError); 
}

getNextDayBack();