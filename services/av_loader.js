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

function getCurrentPrice(res) {
    //console.log(res["Time Series (Daily)"][res["Meta Data"]["3. Last Refreshed"]]["4. close"])
    return res["Time Series (Daily)"][res["Meta Data"]["3. Last Refreshed"]]["4. close"];
}

function getMovingAverages(res) {

}

function getNextDayBack(res, day) {
    let date = new Date(day);
    console.log(date);
    let current = date.toISOString().substring(0, 10);
    while (!res["Time Series (Daily)"].hasOwnProperty(current)) {
            if (timeout > 200) throw 'timeout';
            date = new Date(date.getTime() - 86400000);
            current = date.toISOString().substring(0, 10);
            timeout++;
    }
    return current;
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


//Testing
avCall('GOOG', getCurrentPrice, console.log);